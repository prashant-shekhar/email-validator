class ApplicationController < ActionController::Base
    def encode_token(payload)
        JWT.encode(payload,'my_secret')
    end
    rescue_from CanCan::AccessDenied do |exception|
        redirect_to root_url, alert: exception.message
      end
      
end
