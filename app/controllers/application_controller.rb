class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  if ENV['HEROKU_APP_NAME'].present?
    before_action { request.variant = :review }
  end
end
