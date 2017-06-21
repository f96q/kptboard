Fabricator(:user) do
  name { Faker::Pokemon.unique.name }
  email { Faker::Internet.unique.safe_email }
  password 'password'
end
