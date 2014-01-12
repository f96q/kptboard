require 'spec_helper'

feature 'session' do
  given(:user) { Fabricate :user }

  scenario 'success sign up' do
    visit new_user_registration_path
    fill_in 'Email', with: 'test@example.com'
    fill_in 'Name', with: 'test'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign up'
    expect(page).to_not have_selector('a', text: 'Sign Up')
  end

  scenario 'success sign in' do
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'password'
    click_button 'Sign in'
    expect(page).to_not have_selector('a', text: 'Sign In')
  end

  scenario 'success sign out' do
    sign_in user
    visit root_path
    click_link 'Sign Out'
    expect(page).to have_selector('a', text: 'Sign In')
  end
end
