module EncodedTokenConcern
    extend ActiveSupport::Concern
    def encode_token(payload)
        JWT.encode(payload, "my_secret")
    end
end