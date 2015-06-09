Rails.application.routes.draw do
  root 'static_pages#root'
  resources :users
  resource :session
end
