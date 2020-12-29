class Api::V1::EmailsController < ApplicationController

  def index
    user=User.find(params[:userid])
    emails= user.emails
    render json: emails
  end

  def create
    if(params[:type])
      original_file = params[:file]
      file = original_file.tempfile
      file_type = original_file.content_type
      file_name = original_file.original_filename
      if file_type == "text/csv"
        user_id = params[:userid]
        rows = Email.read_csv(file)
        output_file_path = Email.to_csv(rows, user_id, file_name)
        render json: {error: false, file_path: output_file_path, message: 'File successfully validated'}
      else
        render json: {error: true, message: 'File format not supported. Please upload CSV file.'}, status: :not_acceptable
      end
    else
      render json: Email.validate_email(params[:email], params[:userid])
    end
  end

end
