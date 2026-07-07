require "rails_helper"

RSpec.describe "Api::Reviews", type: :request do
  let!(:item) { create(:item) }

  describe "POST /api/reviews" do
    it "creates a review" do
      expect {
        post "/api/reviews", params: { review: { item_id: item.id, ratings: 4, body: "Solid build.", author: "Jason" } }
      }.to change(Review, :count).by(1)

      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body["item_id"]).to eq(item.id)
      expect(body["ratings"]).to eq(4)
      expect(body["body"]).to eq("Solid build.")
      expect(body["author"]).to eq("Jason")
    end
  end

  describe "GET /api/reviews" do
    it "returns reviews keyed by id" do
      review = create(:review, item: item, author: "Jason")
      get "/api/reviews"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body[review.id.to_s]["author"]).to eq("Jason")
    end
  end

  describe "PUT /api/reviews/:id" do
    it "updates the review" do
      review = create(:review, item: item, ratings: 2)
      put "/api/reviews/#{review.id}", params: { review: { ratings: 5 } }
      expect(response).to have_http_status(:ok)
      expect(review.reload.ratings).to eq(5)
    end
  end

  describe "DELETE /api/reviews/:id" do
    it "removes the review" do
      review = create(:review, item: item)
      delete "/api/reviews/#{review.id}"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["message"]).to eq("Review deleted successfully")
      expect(Review.exists?(review.id)).to be(false)
    end
  end
end
