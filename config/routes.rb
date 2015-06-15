Rails.application.routes.draw do
  root 'static_pages#root'
  get 'api/businesses/search'
  
  resources :users
  resource :session
  namespace 'api', defaults: { format: :json } do
    resources 'users'
    resources 'businesses'
    resources 'reviews'
    resources 'followings'
  end
end
