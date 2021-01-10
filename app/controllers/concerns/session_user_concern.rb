module SessionUserConcern
  extend ActiveSupport::Concern
  def session_user
    decoded_hash = decoded_token
    unless decoded_hash.empty?
      user_id = decoded_hash[0]["user_id"]
      @logged_in_user = User.find_by(id: user_id)
    end
  end
end
