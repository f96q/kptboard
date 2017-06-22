class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  if ENV['DEMO_LOGIN'].present?
    before_action { request.variant = :demo_login }
  end
end
