class Review < ApplicationRecord 
    belongs_to :item

    validates :ratings, :body, :author, :item_id, presence: true
end