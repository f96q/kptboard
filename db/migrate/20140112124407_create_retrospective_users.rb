class CreateRetrospectiveUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :retrospective_users do |t|
      t.timestamps
    end
    add_reference :retrospective_users, :retrospective, index: true, null: false
    add_reference :retrospective_users, :user, index: true, null: false
    add_index :retrospective_users, [:retrospective_id, :user_id], unique: true
  end
end
