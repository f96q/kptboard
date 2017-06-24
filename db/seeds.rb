# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = [].tap { |user|  10.times { user << Fabricate(:user) } }
3.times do
  retrospective = Fabricate(:retrospective)
  users.each { |user| Fabricate(:retrospectives_user, retrospective: retrospective, user: user) }
  15.times { Fabricate(:label, retrospective: retrospective, user: users.sample) }
end
