Rails.application.routes.draw do
  root 'static_pages#root'
  get 'about' => 'static_pages#about'

  resources :users
  resource :session
  namespace 'api', defaults: { format: :json } do
    resources 'users'
    resources 'businesses'
    resources 'reviews'
    resources 'followings'
  end
end
