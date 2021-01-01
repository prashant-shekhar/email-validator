class Api::V1::EmailsController < ApplicationController
  before_action :require_login

  def index
    emails = @logged_in_user.emails
    render json: emails
  end

  def create
    if (params[:type])
      original_file = params[:file]
      file = original_file.tempfile
      file_type = original_file.content_type
      file_name = original_file.original_filename
      if file_type == "text/csv"
        user_id = @logged_in_user.id
        rows = Email.read_csv(file)
        output_file_path = Email.to_csv(rows, user_id, file_name)
        render json: { error: false, file_path: output_file_path, message: "File successfully validated" }
      else
        render json: { error: true, message: "File format not supported. Please upload CSV file." }, status: :not_acceptable
      end
    else
      render json: Email.validate_email(params[:email], @logged_in_user.id)
    end
  end
    def require_login
      render json: {message: 'Please Login First!'}, status: :unauthorized unless !!session_user

    end
end
