require "test_helper"

class EmailFlowTest < ActionDispatch::IntegrationTest
  setup do
    @email = emails :valid
  end

  test "listing the emails" do
    get "/api/v1/emails/index"
    assert_response :success
  end

  test "creating an email" do
    post "/api/v1/emails", params: { email: @email.email}, headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMDE3OTkxNjl9.Xcse16JblkZDczoRfNuLqqdYC7Mi_hGgoQz6tVPMflQ'
  } 
    assert_response :success
  end
end
