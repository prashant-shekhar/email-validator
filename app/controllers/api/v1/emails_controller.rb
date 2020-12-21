class Api::V1::EmailsController < ApplicationController
  def index
    @user=User.find(params[:userid])
    @emails= @user.emails
    render json: @emails
  end

  def create
    @email = 'nikhi@gmail.com';
    @res = Truemail.validate(@email)
    if @res.result.success
      @email= Email.new(email_params)
      @email.save
    end
    render json: @res.result.success
  end
  # single email check -> if valid -> database store -> and return 


  private
    def email_params
      params.require(:emails).permit(:email)
    end
end
