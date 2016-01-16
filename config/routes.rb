Rails.application.routes.draw do
  root 'static_pages#root'
  get 'about' => 'static_pages#about'

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :destroy, :new]
  namespace 'api', defaults: { format: :json } do
    resources 'users', only: [:show, :update, :destroy]
    resources 'businesses', only: [:index, :show]
    get 'reviews/sample' => 'reviews#sample'
    resources 'reviews', only: [:index, :create, :show]
    resources 'followings', only: [:create, :show, :destroy]
  end
end
