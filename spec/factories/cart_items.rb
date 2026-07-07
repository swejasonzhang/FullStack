FactoryBot.define do
  factory :cart_item do
    user_id { create(:user).id }
    item_id { create(:item).id }
    quantity { 1 }
    name { "Item" }
    description { "A dependable gaming item." }
    cost { 19.99 }
    image_url { "http://example.com/image.jpg" }
  end
end
