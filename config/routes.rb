Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'uploads/index'
      get 'uploads/create'
    end
  end
  namespace :api do
    namespace :v1 do
      resources :emails, only: [:create, :index]
      post "users/login", to: "users#login"
      post "users/check", to: "users#google_login"
      resources :users, only: [:create, :index, :update]
    end
  end
  root "home#index"
  get "/*path" => "home#index"
end
