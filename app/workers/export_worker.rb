class ExportWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(rows, user_id, file_name)
    output_file_path = Email.to_csv(rows, user_id, file_name)
    Pusher.trigger("my-channel", "my-event-#{user_id.to_s}", {
      message: output_file_path,
    })
  end
end
