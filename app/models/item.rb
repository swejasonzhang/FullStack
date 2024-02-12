class Item < ApplicationRecord
  validates :name, :cost, :category, :stock, :description, presence: true
  validates :ratings, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  has_one_attached :photo
end