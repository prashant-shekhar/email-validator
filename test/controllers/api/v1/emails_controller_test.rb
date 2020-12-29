require "test_helper"

class Api::V1::EmailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @email = emails :valid
  end

  test "should get index" do
    get "/api/v1/emails/index"
    assert_response :success
  end

  test "should create email" do
    post "/api/v1/emails", params: { email: @email.email, userid: @email.user }
    assert_response :success
  end

  test "get response" do
    get "/api/v1/emails/index"
    assert_equal 200, response.status
  end

  test "create response" do
    post "/api/v1/emails", params: { email: @email.email, userid: @email.user }
    assert_equal 200, response.status
  end
end
