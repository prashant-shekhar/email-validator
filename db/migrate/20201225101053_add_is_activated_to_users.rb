class AddIsActivatedToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :is_activated, :boolean, default: false
  end
end
