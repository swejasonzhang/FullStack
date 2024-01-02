json.array! @cart_items do |cart_item|
  json.extract! @cart_item, :image_url, :name, :cost, :description, :user_id, :item_id, :quantity
end