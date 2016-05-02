require 'spec_helper'

feature 'session' do
  given(:user) { Fabricate :user }

  scenario 'success sign up' do
    visit new_user_registration_path
    fill_in :user_email, with: 'test@example.com'
    fill_in :user_name, with: 'test'
    fill_in :user_password, with: 'password'
    fill_in :user_password_confirmation, with: 'password'
    find('.js-sign-up').click
    expect(page).to_not have_text I18n.t('devise.registrations.new.sign_up')
  end

  scenario 'success sign in' do
    visit new_user_session_path
    fill_in :user_email, with: user.email
    fill_in :user_password, with: 'password'
    find('.js-sign-in').click
    expect(page).to_not have_text I18n.t('devise.sessions.new.sign_in')
  end

  scenario 'success sign out' do
    sign_in user
    visit root_path
    find('.js-sign-out').click
    expect(page).to have_text I18n.t('devise.registrations.new.sign_up')
  end
end
