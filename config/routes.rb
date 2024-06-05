Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :items, only: [:show, :update, :index]
    resources :reviews, only: [:create, :show, :index, :update, :destroy]
    resources :cart_items, only: [:index , :show, :create, :update, :destroy]

    post '/items/reviews/reorder_keys', to: 'reviews#reorder_keys'
    delete '/reviews/:id', to: 'reviews#destroy', as: 'delete_review'
  end

  get '*path', to: "static_pages#frontend_index"
  post 'api/test', to: 'application#test'
end
