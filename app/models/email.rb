class Email < ApplicationRecord
  belongs_to :user
  validates :email , presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :user_id , presence: true 

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      Email.create! row.to_hash
  end
  end

  def self.to_csv
    CSV.generate do |csv|
      csv << column_names
      all.each dp |email|
        csv << email.attributes.value_at(*column_names)
    end
  end
end
