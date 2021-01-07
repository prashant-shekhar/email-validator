class ApplicationController < ActionController::Base
  def encode_token(payload)
    JWT.encode(payload, "my_secret")
  end

  def session_user
    decoded_hash = decoded_token
    unless decoded_hash.empty?
      user_id = decoded_hash[0]["user_id"]
      @logged_in_user = User.find_by(id: user_id)
    end
  end

  def decoded_token
    token = request.headers['Authorization']
    begin
      JWT.decode(token, 'my_secret', false, algorithm: 'HS256')
    rescue JWT::DecodeError
      []
    end
  end
end
