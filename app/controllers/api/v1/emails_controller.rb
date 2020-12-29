class Api::V1::EmailsController < ApplicationController
  skip_before_action :verify_authenticity_token
  load_and_authorize_resource
  def index
    user=User.find(params[:userid])
    emails= user.emails
    render json: emails
  end

  def create
    if(params[:type])
      puts params[:file].tempfile
      file = params[:file].tempfile
      user_id = params[:user_id]
      rows = CSV.read(file, headers: true).collect do |row|
        row.to_hash
      end
      column_names = rows.first.keys
      additional_column_names = ['Validity']
      column_names += additional_column_names
      s = CSV.generate do |csv|
        csv << column_names
        rows.each do |row|
          values = row.values
          additional_values_for_row = validate_email(values[0], user_id) ? ["Valid"]:["Invalid"]
          values += additional_values_for_row
          csv << values
        end
      end
      output_file_dir = "#{Rails.root}/public/report"
      if !Dir.exists? output_file_dir
        Dir.mkdir(output_file_dir)
      end  
      output_file_path = "#{output_file_dir}/#{file.path.split('/').last}"
      File.open(output_file_path, "w") { |file| file.write(s) }
      render json: {error: false, file_path: output_file_path, message: 'File successfully validated'}
    else
      render json: validate_email(params[:email], params[:userid])
    end
  end

  private
  def validate_email(email, user_id)
    res = Truemail.validate(email)
      if res.result.success
        if !Email.exists?(user_id: user_id,email: email)
          email= Email.new(email: email,user_id: user_id)
          email.save
        end
      end
    return res.result.success
  end
end
