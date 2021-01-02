class CreateCsvs < ActiveRecord::Migration[6.0]
  def change
    create_table :csvs do |t|
      t.string :output_path
      t.boolean :processed
      t.references :users, null: false, foreign_key: true

      t.timestamps
    end
  end
end
