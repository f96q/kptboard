Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  devise_for :users, :controllers => { registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords' }
  resources :retrospectives do
    member do
      get 'export'
    end
  end

  root 'retrospectives#index'
end
