Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'emails/index'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'users/index'
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
