require "test_helper"

class EmailFlowTest < ActionDispatch::IntegrationTest
  setup do
    @email = emails :valid
    @token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNDkwNjIzODMsInVzZXJfcm9sZSI6InVzZXIifQ.u-v3q27T_tOquwr34qe6UAO6y4hfCS1aT3BYZHuu_4g'
  end

  test "listing the emails" do
    get "/api/v1/emails/index"
    assert_response :success
  end

  test "creating an email" do
    post "/api/v1/emails", params: { email: @email.email }, headers: {
      Authorization: @token
    }
    assert_response :success
  end
end
