class User < ApplicationRecord
    before_save :encrypt_password
    validates :name, presence: true
    validates :username, uniqueness: { case_sensitive: false }, presence: true
    validates :email, uniqueness: { case_sensitive: false }, presence:true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence:true

    has_many :emails

    def encrypt_password  
        self.password = BCrypt::Password.create(password)
    end

    def self.authenticate(encrypted_password, password)
        if BCrypt::Password.new(encrypted_password) == password
          true
        else
          false
        end
    end
end
