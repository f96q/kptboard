class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_permitted_parameters

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :name, :password, :password_confirmation])
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :name, :password, :password_confirmation, :current_password])
  end
end
