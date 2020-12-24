class Email < ApplicationRecord
  belongs_to :user
  validates :email , presence: true
  validates :user_id , presence: true 
end
