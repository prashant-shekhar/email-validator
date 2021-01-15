require "test_helper"

class Api::V1::EmailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @email = emails :valid
    @token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNDkwNjIzODMsInVzZXJfcm9sZSI6InVzZXIifQ.u-v3q27T_tOquwr34qe6UAO6y4hfCS1aT3BYZHuu_4g'
  end

  test "should get index" do
    get "/api/v1/emails/index"
    assert_response :success
  end

  test "should create email" do
    post "/api/v1/emails", params: { email: @email.email }, headers: { Authorization: @token }
    assert_response :success
  end

  test "get response" do
    get "/api/v1/emails/index"
    assert_equal 200, response.status
  end

  test "create response" do
    post "/api/v1/emails", params: { email: @email.email }, headers: {
      Authorization: @token
    }
    assert_equal 200, response.status
  end
end
