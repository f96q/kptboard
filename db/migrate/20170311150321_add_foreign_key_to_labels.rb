class AddForeignKeyToLabels < ActiveRecord::Migration[5.0]
  def change
    add_foreign_key :labels, :retrospectives, column: :retrospective_id
    add_foreign_key :labels, :users, column: :user_id, on_delete: :nullify
  end
end
