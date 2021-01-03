class Api::V1::EmailsController < ApplicationController
  def index
    user = User.find(params[:userid])
    emails = user.emails
    render json: emails
  end

  def create
    render json: Email.validate_email(params[:email], params[:userid])
  end
end
