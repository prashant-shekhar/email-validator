class ApplicationController < ActionController::Base
    def encode_token(payload)
        JWT.encode(payload,'my_secret')
    end
end
