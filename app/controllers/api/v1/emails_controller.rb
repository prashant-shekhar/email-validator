class Api::V1::EmailsController < ApplicationController
  
  def index
    user=User.find(params[:userid])
    emails= user.emails
    render json: emails
  end

  def create
    res = Truemail.validate(params[:email])
    if res.result.success
      if !Email.exists?(user_id: params[:userid],email: params[:email])
        email= Email.new(email: params[:email],user_id: params[:userid] )
        email.save
      end
    end
    render json: res.result.success
  end

  def import
    emails.import(params[:files])
    redirect_to emails_path, notice: "Your File Added Successfully"
  end
end
