class Api::V1::UsersController < ApplicationController

  def index
    user = User.find(params[:user_id])
    puts params[:user_id]
    if user.has_role == 'admin'
      users = User.where(has_role: 'user').select(:id, :name, :username, :email, :is_activated).all
      render json: users
    else
      render json: {error: true, message: "You are not authorize person"}, status: :unauthorized
    end
  end

  def create
    if Truemail.valid?(params[:email])
      user= User.create(user_params);
      if user.valid?
        payload = {user_id: user.id}
        token = encode_token(payload)
        copy_user= user.slice(:id, :name, :email, :username)
        render json: { user: copy_user, jwt: token}
      else
        render json: {errors: user.errors.full_messages}, status: :not_acceptable
      end
    else
      render json: {errors: ['Invalid Email!']}, status: :not_acceptable
    end
  end

  def login
    user= User.find_by(email: params[:email])
    if user && User.authenticate(user.password,params[:password])
      payload= {user_id: user.id}
      token =encode_token(payload)
      copy_user= user.slice("id","name","email","username")
      render json: {user: copy_user,jwt: token, error: false, message: "Welocome back, #{user.name}"}
    else
      render json: { error: true, message: "Log in Failed! invalid email or password"}, status: :not_acceptable
    end 
  end

  private
  def user_params
    params.require(:user).permit(:name,:username,:email,:password, :has_role, :is_activated)
  end
end
