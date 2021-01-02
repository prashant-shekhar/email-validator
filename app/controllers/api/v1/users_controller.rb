require 'net/http'
require 'resolv-replace'
class Api::V1::UsersController < ApplicationController
  def index
    user = User.find(params[:user_id])
    if user.has_role == "admin"
      users = User.filter_users
      render json: users, status: :ok
    else
      render json: { error: true, message: "You are not authorize person" }, status: :unauthorized
    end
  end

  def google_login
    access_token= params[:access_token]
    result = Net::HTTP.get(URI.parse("https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=#{access_token}"))
    result=JSON.parse(result)
    if(result["email"]==params[:email])
        user = User.find_by(email: params[:email])
        if user
          find_token(user)
        else
          user=User.create(name: params[:name],email: params[:email], password: params[:password], username: params[:username], has_role:'user', is_activated: false)
          if user.valid?
            find_token(user)
          else
            render json: {error: true, 'response':user.errors.full_messages}, status: :not_acceptable
          end
        end
    else
      render json: { error: true, message: "You are not authorize person" }, status: :unauthorized
    end
  end

  def create
    if Truemail.valid?(params[:email])
      user = User.create(user_params)
      if user.valid?
        find_token(user)
      else
        render json: { errors: user.errors.full_messages }, status: :not_acceptable
      end
    else
      render json: { errors: ["Invalid Email!"] }, status: :not_acceptable
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user && User.authenticate(user.password, params[:password])
      find_token(user)
    else
      render json: { message: "Invalid username or password!"}, status: :not_acceptable
    end
  end

  def update
    admin = User.find(params[:admin_id])
    if admin.has_role == "admin"
      user = User.find(params[:id])
      if user.update(user_params)
        copy_user = user.slice(:id, :name, :email, :username, :has_role, :is_activated)
        render json: { user: copy_user, message: "user activated successfully" }, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :not_acceptable
      end
    else
      render json: { errors: ["You are not authorize person."] }, status: :unauthorized
    end
  end

  private
  def user_params
    params.permit(:name, :username, :email, :password, :has_role, :is_activated)
  end

  def find_token(user)
    payload = { user_id: user.id, user_role: user.has_role }
    token = encode_token(payload)
    copy_user = user.slice(:id, :name, :email, :username, :has_role, :is_activated)
    render json: { user: copy_user, jwt: token }, status: :ok
  end
end


# use keyword is_valid for response