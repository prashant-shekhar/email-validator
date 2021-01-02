class ExportWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(id, user_id, file_name)
    file_object = Attachment.find_by(id: id)
    rows = Email.read_csv(file_object.csv_file.download)
    output_file_path = Email.to_csv(rows, user_id, file_name)
    Pusher.trigger("my-channel", "my-event-#{user_id.to_s}", {
      message: output_file_path,
    })
  end
end
