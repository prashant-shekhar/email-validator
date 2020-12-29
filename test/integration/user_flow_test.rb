require "test_helper"

class UserFlowTest < ActionDispatch::IntegrationTest
  setup do
    @admin = users :admin
    @user = users :valid
  end

  test "list the users" do
    get "/api/v1/users", params: { user_id: @admin.id }, as: :json
    assert_response :success
  end

  test "should not create user" do
    assert_no_changes("User.count") do
      post "/api/v1/users", params: { name: "New User", email: "", username: "New_Username", password: "sample_password", has_role: "user", is_activated: true }, as: :json
    end
    assert_equal 406, response.status
  end

  test "login an user" do
    post "/api/v1/users/login", params: { email: @user.email, password: "nikhil" }, as: :json
    assert_response :success
  end

  test "should not login an user" do
    post "/api/v1/users/login", params: { email: @user.email, password: "nikhil1" }, as: :json
    assert_equal 406, response.status
  end

  test "update an user" do
    put "/api/v1/users/#{@user.id}", params: { admin_id: @admin.id, is_activated: !@user.is_activated }, as: :json
    assert_response :success
  end

  test "should not update an user" do
    put "/api/v1/users/#{@user.id}", params: { admin_id: @user.id, is_activated: !@user.is_activated }, as: :json
    assert_equal 401, response.status
  end
end
