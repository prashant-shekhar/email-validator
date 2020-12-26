class Email < ApplicationRecord
  belongs_to :user
  validates :email , presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :user_id , presence: true 

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Email.create! row.to_hash
  end
  end
end
