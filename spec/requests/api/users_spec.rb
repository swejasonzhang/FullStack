require "rails_helper"

RSpec.describe "Api::Users", type: :request do
  describe "POST /api/users" do
    it "creates a user with valid input" do
      expect {
        post "/api/users", params: { user: { username: "newuser", email: "newuser@example.com", password: "password123" } }
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["user"]["username"]).to eq("newuser")
      expect(body["user"]["email"]).to eq("newuser@example.com")
    end

    it "returns 422 with errors on a short password" do
      expect {
        post "/api/users", params: { user: { username: "shorty", email: "shorty@example.com", password: "abc" } }
      }.not_to change(User, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body["errors"]).to be_present
    end

    it "returns 422 with errors on a duplicate email" do
      create(:user, email: "dupe@example.com")

      expect {
        post "/api/users", params: { user: { username: "another", email: "dupe@example.com", password: "password123" } }
      }.not_to change(User, :count)

      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body["errors"]).to be_present
    end
  end
end
