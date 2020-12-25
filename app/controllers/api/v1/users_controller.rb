class Api::V1::UsersController < ApplicationController

  def create
    if Truemail.valid?(params[:email])
      user= User.create(user_params);
      if user.valid?
        payload = {user_id: user.id}
        token = encode_token(payload)
        usr= user.slice("id","name","email","username")
        render json: { user: usr, jwt: token}
      else
        render json: {errors: user.errors.full_messages} , status: :not_acceptable
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
      usr= user.slice("id","name","email","username")
      render json: {user: usr,jwt: token, error: false, message: "Welocome back, #{user.name}"}
    else
      render json: { error: true, message: "Log in Failed! invalid email or password"}
    end 
  end


  private
  def user_params
    params.require(:user).permit(:name,:username,:email,:password)
  end
end
