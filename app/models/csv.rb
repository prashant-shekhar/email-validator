class Csv < ApplicationRecord
  belongs_to :users
  has_one_attached :csv_file
end
