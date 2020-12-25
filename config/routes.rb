Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :emails, only: [:create, :index]
      post "users/login", to: "users#login"
      resources :users, only: [:create, :index, :update]
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
end
