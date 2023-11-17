class Item < ApplicationRecord
    validates :name,:cost,:category,:stock, presence: true

    
end
