class CreateAttachments < ActiveRecord::Migration[6.0]
  def change
    create_table :attachments do |t|
      t.string :output_path
      t.boolean :processed
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
