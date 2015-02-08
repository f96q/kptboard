require 'spec_helper'

feature 'session' do
  given(:user) { Fabricate :user }

  scenario 'success sign up' do
    visit new_user_registration_path
    fill_in 'Email', with: 'test@example.com'
    fill_in 'Name', with: 'test'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    find('.retrospective-form__button').click
    expect(page).to_not have_selector('a', text: 'Sign Up')
  end

  scenario 'success sign in' do
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    find('.retrospective-form__button').click
    expect(page).to_not have_selector('a', text: 'Sign In')
  end

  scenario 'success sign out' do
    sign_in user
    visit root_path
    find('.navigation__item--sign-out').click
    expect(page).to have_selector('a', text: 'Sign up')
  end
end
