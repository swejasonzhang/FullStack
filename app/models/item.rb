class Item < ApplicationRecord
  validates :name, :cost, :category, :stock, :description, presence: true
  has_one_attached :photo
end