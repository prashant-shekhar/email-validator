class ExportWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(id)
    attachment = Attachment.find_by(id: id)
    user_id = attachment.user_id
    file_name = attachment.csv_file.filename.to_s
    rows = Attachment.read_csv(attachment.csv_file.download)
    output_path = Attachment.to_csv(rows, user_id, file_name)
    attachment.update(output_path: output_path, processed: true)
    Pusher.trigger("my-channel", "my-event-#{user_id.to_s}", {
      attachment: attachment,
    })
  end
end
