json.array! @items do |item|
    json.extract! item, :id, :user_id, :item_id
  end