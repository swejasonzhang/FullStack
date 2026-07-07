require "rails_helper"

RSpec.describe "Api::CartItems", type: :request do
  let!(:user) { create(:user, password: "password123") }
  let!(:item) { create(:item) }

  before do
    post "/api/session", params: { credential: user.email, password: "password123" }
  end

  def cart_item_attrs
    { name: "Mouse", cost: 19.99, description: "A dependable item.", item_id: item.id, quantity: 1, image_url: "http://example.com/image.jpg" }
  end

  describe "POST /api/cart_items" do
    it "creates a cart item" do
      expect {
        post "/api/cart_items", params: { cart_item: cart_item_attrs }
      }.to change(CartItem, :count).by(1)

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body["item_id"]).to eq(item.id)
      expect(body["user_id"]).to eq(user.id)
    end
  end

  describe "GET /api/cart_items" do
    it "includes the created cart item" do
      post "/api/cart_items", params: { cart_item: cart_item_attrs }
      get "/api/cart_items"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body[item.id.to_s]["name"]).to eq("Mouse")
    end
  end

  describe "PATCH /api/cart_items/:id" do
    it "updates the quantity" do
      post "/api/cart_items", params: { cart_item: cart_item_attrs }
      cart_item = CartItem.last
      patch "/api/cart_items/#{cart_item.id}", params: { cart_item: { quantity: 5 } }
      expect(response).to have_http_status(:ok)
      expect(cart_item.reload.quantity).to eq(5)
    end
  end

  describe "DELETE /api/cart_items/:id" do
    it "removes the cart item" do
      post "/api/cart_items", params: { cart_item: cart_item_attrs }
      cart_item = CartItem.last
      delete "/api/cart_items/#{cart_item.id}", params: { itemId: cart_item.id }
      expect(CartItem.exists?(cart_item.id)).to be(false)
    end
  end
end
