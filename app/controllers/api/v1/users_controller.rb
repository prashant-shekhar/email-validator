class Api::V1::UsersController < ApplicationController
  def index
    user = User.find(params[:user_id])
    if user.has_role == "admin"
      users = User.filter_users
      render json: users
    else
      render json: { error: true, message: "You are not authorize person" }, status: :unauthorized
    end
  end

  def create
    if Truemail.valid?(params[:email])
      user = User.create(user_params)
      if user.valid?
        payload = { user_id: user.id }
        token = encode_token(payload)
        copy_user = user.slice(:id, :name, :email, :username, :has_role, :is_activated)
        render json: { user: copy_user, jwt: token }
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
      payload = { user_id: user.id }
      token = encode_token(payload)
      copy_user = user.slice(:id, :name, :email, :username, :has_role, :is_activated)
      render json: { error: false, user: copy_user, jwt: token }
    else
      render json: { error: true, message: "Log in Failed! invalid email or password" }, status: :not_acceptable
    end
  end

  def update
    admin = User.find(params[:admin_id])
    if admin.has_role == "admin"
      user = User.find(params[:id])
      if user.update(user_params)
        copy_user = user.slice(:id, :name, :email, :username, :has_role, :is_activated)
        render json: { user: copy_user, message: "user activated successfully" }
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
end
