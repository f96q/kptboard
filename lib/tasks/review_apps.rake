namespace :review_apps do
  task seed: :environment do
    [
      Label,
      RetrospectivesUser,
      Retrospective,
      User
    ].each do |model|
      model.delete_all
    end
    users = [].tap { |user|  10.times { user << Fabricate(:user) } }
    3.times do
      retrospective = Fabricate(:retrospective)
      users.each { |user| Fabricate(:retrospectives_user, retrospective: retrospective, user: user) }
      15.times { Fabricate(:label, retrospective: retrospective, user: users.sample) }
    end
  end
end
