class Item < ApplicationRecord
    validates :name,:cost,:category,:stock, presence: true

    has_one_attached :photo
end
