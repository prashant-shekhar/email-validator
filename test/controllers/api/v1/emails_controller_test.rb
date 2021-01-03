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
    post "/api/v1/emails", params: { email: @email.email}, headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDE3OTkxNjl9.Xcse16JblkZDczoRfNuLqqdYC7Mi_hGgoQz6tVPMflQ'
  }
    assert_response :success
  end

  test "get response" do
    get "/api/v1/emails/index"
    assert_equal 200, response.status
  end

  test "create response" do
    post "/api/v1/emails", params: { email: @email.email}, headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDE3OTkxNjl9.Xcse16JblkZDczoRfNuLqqdYC7Mi_hGgoQz6tVPMflQ'
  } 
    assert_equal 200, response.status
  end
end
