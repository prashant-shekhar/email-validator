class ApplicationController < ActionController::Base
  include EncodedTokenConcern
  include SessionUserConcern
  include DecodedTokenConcern
end
