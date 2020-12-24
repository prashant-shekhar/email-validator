class Email < ApplicationRecord
  belongs_to :user
  validates :email , presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :user_id , presence: true 
end
