require 'test_helper'

class EmailTest < ActiveSupport::TestCase
  test "should not save email without email" do
    email = Email.new
    assert_not email.save, "Saved the email without email"
  end
end
