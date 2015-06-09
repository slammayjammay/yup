Rails.application.routes.draw do
  root 'users#new'
  resources :users
  resource :session
end
