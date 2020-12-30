class ExportJob < ApplicationJob
  queue_as :default

  def perform(rows, user_id, file_name)
    Email.to_csv(rows, user_id, file_name)
  end
end
