require "rails_helper"

RSpec.describe "Api::Items", type: :request do
  describe "GET /api/items" do
    it "returns all items keyed by id" do
      item = create(:item, name: "Mouse")
      get "/api/items"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body[item.id.to_s]["name"]).to eq("Mouse")
    end
  end

  describe "GET /api/items/:id" do
    it "returns a single item wrapped in item" do
      item = create(:item, name: "Keyboard")
      get "/api/items/#{item.id}"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["item"]["id"]).to eq(item.id)
      expect(body["item"]["name"]).to eq("Keyboard")
    end
  end

  describe "PATCH /api/items/:id" do
    it "decrements stock by the given quantity" do
      item = create(:item, stock: 10)
      patch "/api/items/#{item.id}", params: { item: { stock: 10 }, quantity: 3 }
      expect(response).to have_http_status(:ok)

      get "/api/items/#{item.id}"
      body = JSON.parse(response.body)
      expect(body["item"]["stock"]).to eq(7)
    end
  end
end
