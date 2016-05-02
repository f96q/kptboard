module FeatureHelper
  def sign_in(user, password = 'password')
    visit new_user_session_path
    fill_in :user_email, with: user.email
    fill_in :user_password, with: password
    find('.js-sign-in').click
  end
end
