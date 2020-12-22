class Api::V1::UsersController < ApplicationController

  def create
    user= User.create(user_params);
    if user.valid?
      payload = {user_id: user.id}
      token = encode_token(payload)
      render json: { user: user, jwt: token}
    else
      render json: {errors: user.errors.full_messages}, status: :not_acceptable
    end
  end

  def login
    user= User.find_by(email: params[:email])
    if user && User.authenticate(user.password,params[:password])
      payload= {user_id: user.id}
      token =encode_token(payload)
      render json: {user: user,jwt: token, success: "Welocome back, #{user.name}"}
    else
      render json: { failure: "Log in Failed! invalid email or password"}
    end 
  end


  private
  def user_params
    params.permit(:name,:username,:email,:password)
  end
end
