require 'test_helper'

class EmailFlowTest < ActionDispatch::IntegrationTest
  setup do
    @email= emails :valid
  end

  test "listing the emails" do
    get '/api/v1/emails/index'
    assert_response :success
  end

  test "creating an email" do
    post '/api/v1/emails', params:{email: @email.email, userid: @email.user}
    assert_response :success
  end

end
