class RenameRetrospectiveUsersToRetrospectivesUsers < ActiveRecord::Migration[5.0]
  def change
    rename_table :retrospective_users, :retrospectives_users
    add_foreign_key :retrospectives_users, :retrospectives, column: :retrospective_id
    add_foreign_key :retrospectives_users, :users, column: :user_id
  end
end
