class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.string :email, null: false, format: { with: URI::MailTo::EMAIL_REGEXP }
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
