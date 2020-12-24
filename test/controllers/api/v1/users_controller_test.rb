require 'test_helper'

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user= users(:valid)
  end

  test "should create user" do
    post '/api/v1/users', params:{name: @user.name, username: @user.username, email: @user.email, password: @user.password}, as: :json
    assert :success
  end 

  test "should login user" do
    post '/api/v1/users/login', params:{email: 'email', password:'password'}, as: :json
    assert :success
  end

  test "response create user" do
    post '/api/v1/users', params:{name: @user.name, username: @user.username, email: @user.email, password: @user.password}, as: :json
    assert_equal 200, response.status
  end 

  test "response login user" do
    post '/api/v1/users/login', params:{email: 'email', password:'password'}, as: :json
    assert_equal 200, response.status
  end

end
