Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/drinks', to: 'drinks#index'
  get '/drinks/:id', to: 'drinks#show'
  post '/drinks', to: 'drinks#create'
  delete '/drinks/:id', to: 'drinks#delete'
  put '/drinks/:id', to: 'drinks#update'
end
