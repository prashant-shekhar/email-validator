class Api::V1::UploadsController < ApplicationController
  def index
  end

  def create
    original_file = params[:csv_file]
    file = original_file.tempfile
    file_type = original_file.content_type
    file_name = original_file.original_filename
    if file_type == "text/csv"
      user_id = params[:userid]
      rows = Email.read_csv(file)
      file_object = Attachment.create(user_id: user_id, csv_file: params[:csv_file], processed: false)
      ExportWorker.perform_async(file_object.id, user_id, file_name)
      render json: { error: false, message: "File is processing" }
    else
      render json: { error: true, message: "File format not supported. Please upload CSV file." }, status: :not_acceptable
    end
  end
end
