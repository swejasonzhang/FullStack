class CartItems < ApplicationRecord
    validates :user_id, :item_id, :quantity, presence: true
end