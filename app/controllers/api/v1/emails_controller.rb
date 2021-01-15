class Api::V1::EmailsController < ApplicationController
  before_action :require_login
  def index
    emails = @logged_in_user.emails
  end

  def create
    render json: Email.validate_email(params[:email], @logged_in_user.id)
  end

  def require_login
    render json: { message: "Please Login First!" }, status: :unauthorized unless !!session_user
  end
end
