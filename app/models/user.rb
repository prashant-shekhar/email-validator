class User < ApplicationRecord
    validates :name, presence: true
    validates :username, uniqueness: true, presence: true
    validates :email, uniqueness: true, presence:true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence:true, length: { in: 6..20}

    has_many :emails
end
