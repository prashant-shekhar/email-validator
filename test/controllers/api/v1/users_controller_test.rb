require 'test_helper'

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user= users :valid
  end

  test "should create user" do
    post '/api/v1/users', params: @user, as: :json
    assert :success
  end 

  test "should login user" do
    post '/api/v1/users/login', params:{email: 'email', password:'password'}, as: :json
    assert :success
  end

  test "valid response create user" do
    post '/api/v1/users', params: {email: 'nikhil.bhatt@elitmus.com', password:'password',name:'name1',username:'username3'}, as: :json
    assert_equal 200, response.status
  end 

  test "invalid response create user" do
    post '/api/v1/users', params: @user, as: :json
    assert_equal 406, response.status
  end 

  test "valid response login user" do
    post '/api/v1/users/login', params:{email: @user.email, password: 'nikhil'}, as: :json
    assert_equal 200, response.status
  end

  test "invalid response login user" do
    post '/api/v1/users/login', params:{email: @user.email, password: 'nikhil1'}, as: :json
    assert_equal 406, response.status
  end

end
