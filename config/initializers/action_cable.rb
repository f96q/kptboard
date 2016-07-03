if Rails.env.development?
  ActionCable.server.config.disable_request_forgery_protection = true
else
  Rails.application.config.action_cable.allowed_request_origins = (ENV['ACTION_CABLE_ALLOWED_REQUEST_ORIGINS'] || '').split(',')
end
