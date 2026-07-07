class Item < ApplicationRecord
  validates :name, :cost, :category, :description, presence: true

  has_many :reviews, dependent: :destroy
  has_many :cart_items, dependent: :destroy
  has_one_attached :photo
end
