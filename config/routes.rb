Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords' }
  resources :retrospectives do
    member do
      get 'export'
    end
  end

  if ENV['DEMO_LOGIN'] == 'true'
    resources :review_users, only: [:show]
  end

  root 'retrospectives#index'
end
