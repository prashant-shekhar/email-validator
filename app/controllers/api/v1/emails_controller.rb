class Api::V1::EmailsController < ApplicationController
  def index
    user=User.find(params[:userid])
    emails= user.emails
    render json: emails
  end

  def create
    res = Truemail.validate(params[:email])
    if res.result.success
      email= Email.new(email: params[:email],user_id: params[:userid] )
      email.save
    end
    render json: res.result
  end
end
