namespace :review_apps do
  task seed: :environment do
    [
      Label,
      RetrospectivesUser,
      Retrospective,
      User
    ].each do |model|
      model.delete_all
      ActiveRecord::Base.connection.execute("ALTER TABLE #{model.table_name} AUTO_INCREMENT = 1;")
    end
    users = [].tap { |user|  10.times { user << Fabricate(:user) } }
    3.times do
      retrospective = Fabricate(:retrospective)
      users.each { |user| Fabricate(:retrospectives_user, retrospective: retrospective, user: user) }
      15.times { Fabricate(:label, retrospective: retrospective, user: users.sample) }
    end
  end

  task bootstrap: ['db:setup', 'review_apps:seed'] do
  end
end
