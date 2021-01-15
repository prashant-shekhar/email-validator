class Email < ApplicationRecord
  belongs_to :user
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :user_id, presence: true

  def self.validate_email(email, user_id)
    res = Truemail.validate(email)
    if res.result.success
      if !Email.exists?(user_id: user_id, email: email)
        email = Email.new(email: email, user_id: user_id)
        email.save
      end
    end
    return res.result.success
  end
end
