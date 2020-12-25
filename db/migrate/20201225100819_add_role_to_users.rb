class AddRoleToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :has_role, :string, null: false
  end
end
