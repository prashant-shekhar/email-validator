module DecodedTokenConcern
  extend ActiveSupport::Concern
  def decoded_token
    token = request.headers['Authorization']
    begin
      JWT.decode(token, 'my_secret', false, algorithm: 'HS256')
    rescue JWT::DecodeError
      []
    end
  end
end
