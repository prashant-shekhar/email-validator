class Ability
    include CanCan::Ability
    def initialize(user)
      user ||= User.new
      if user.user?
        can :manage, Email, user_id: user.id
      elsif user.admin?
        can :manage
      else
        can :read, :all
      end
    end
  end