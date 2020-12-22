class User < ApplicationRecord
    # has_secure_password
    before_save :encrypt_password
    validates :name, presence: true
    validates :username, uniqueness: true, presence: true
    validates :email, uniqueness: true, presence:true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, presence:true

    has_many :emails

    def encrypt_password  
        self.password = BCrypt::Password.create(password)
    end

    def self.authenticate(password, param_password)
        if BCrypt::Password.new(password) == param_password
          true
        else
          false
        end
    end
end
