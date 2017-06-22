if Rails.env.development?
  ActionCable.server.config.disable_request_forgery_protection = true
elsif ENV['HEROKU_APP_NAME'].present?
  Rails.application.config.action_cable.allowed_request_origins = [%r(https?:\/\/#{ENV['HEROKU_APP_NAME']}\.herokuapp.com)]
else
  Rails.application.config.action_cable.allowed_request_origins = (ENV['ACTION_CABLE_ALLOWED_REQUEST_ORIGINS'] || '').split(',')
end
