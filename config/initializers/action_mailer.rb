if ENV['SMTP_URL'].present? && ENV['HOST'].present?
  smtp_url = URI.parse(ENV['SMTP_URL'])
  user = smtp_url.user
  password = smtp_url.password
  host = smtp_url.host
  Rails.application.config.action_mailer.default_url_options = { host: ENV['HOST'] }
  Rails.application.config.action_mailer.delivery_method = :smtp
  Rails.application.config.action_mailer.raise_delivery_errors = true
  Rails.application.config.action_mailer.smtp_settings = {
    domain: host,
    address: host,
    port: 587,
    authentication: 'plain',
    enable_starttls_auto: true,
    user_name: user,
    password: password,
  }
end
