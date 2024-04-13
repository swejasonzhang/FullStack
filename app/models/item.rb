class Item < ApplicationRecord
  validates :name, :cost, :category, :description, presence: true
  has_one_attached :photo
end