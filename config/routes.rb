Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :emails, only: [:create,:index]
    end
  end
  namespace :api do
    namespace :v1 do
        resource :users, only: [:create]
        post "users/login", to: "users#login"
    end
  end
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
