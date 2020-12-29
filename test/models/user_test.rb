require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:valid)
  end

  test "valid user" do
    assert @user.valid?
  end

  test "invalid without name" do
    @user.name = nil
    assert_not @user.valid?, "user is valid without name"
    assert_not_nil @user.errors[:name], "no validation error for name present"
  end

  test "invalid without username" do
    @user.username = nil
    assert_not @user.valid?, "user is valid without username"
    assert_not_nil @user.errors[:username], "no validation error for username present"
  end

  test "invalid without email" do
    @user.email = nil
    assert_not @user.valid?, "user is valid without email"
    assert_not_nil @user.errors[:email], "no validation error for email present"
  end

  test "invalid without password" do
    @user.password = nil
    assert_not @user.valid?, "user is valid without password"
    assert_not_nil @user.errors[:password], "user is valid without password"
  end

  test "invalid without has_role" do
    @user.has_role = nil
    assert_not @user.valid?, "User is valid without Role"
    assert_not_nil @user.errors[:has_role], "User is valid without Role"
  end

  test "valid email format" do
    assert_match URI::MailTo::EMAIL_REGEXP, @user.email, "email is valid without matching format"
  end

  test "email and username should be unique" do
    copy_user = @user.dup
    assert_not copy_user.valid?
    assert_not_nil copy_user.errors[:username], "no uniqueness validation error for username present"
    assert_not_nil copy_user.errors[:email], "no uniqueness validation error for email present"
  end

  test "#emails" do
    assert_equal 1, @user.emails.size
  end
end
