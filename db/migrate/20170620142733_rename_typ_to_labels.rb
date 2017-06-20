class RenameTypToLabels < ActiveRecord::Migration[5.1]
  def change
    rename_column :labels, :typ, :kind
  end
end
