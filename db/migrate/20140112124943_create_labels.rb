class CreateLabels < ActiveRecord::Migration[5.0]
  def change
    create_table :labels do |t|
      t.string   :typ, null: false
      t.text     :description
      t.integer  :position
      t.timestamps
    end
    add_reference :labels, :retrospective, index: true, null: false
    add_reference :labels, :user, index: true
  end
end
