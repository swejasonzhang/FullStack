Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    
    resources :items, only: [:show, :index]
    resources :reviews, only: [:create, :show, :index]
      
    resources :cart_items, only: [:index , :show, :create, :update, :destroy]
  end

  delete '/api/cart_items/delete', to: 'cart_items#destroy_multiple'
  get '*path', to: "static_pages#frontend_index"
  post 'api/test', to: 'application#test'
end
