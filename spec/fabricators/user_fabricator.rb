Fabricator(:user) do
  name 'test'
  email { sequence(:email) {|i| "user#{i}@example.com"} }
  password 'password'
end
