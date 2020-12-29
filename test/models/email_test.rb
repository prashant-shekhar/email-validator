require "test_helper"

class EmailTest < ActiveSupport::TestCase
  def setup
    @email = emails(:valid)
  end

  test "invalid without email" do
    @email.email = nil
    assert_not @email.valid?, "email is valid without email"
    assert_not_nil @email.errors[:email], "no validation error for email present"
  end

  test "invalid without user" do
    @email.user_id = nil
    assert_not @email.valid?, "email is valid without user"
    assert_not_nil @email.errors[:user_id], "no validation error for user present"
  end

  test "valid email format" do
    assert_match URI::MailTo::EMAIL_REGEXP, @email.email, "email is valid without matching format"
  end
end
