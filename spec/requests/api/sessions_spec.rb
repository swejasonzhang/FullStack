require "rails_helper"

RSpec.describe "Api::Sessions", type: :request do
  let!(:user) { create(:user, email: "jason@example.com", password: "password123") }

  describe "POST /api/session" do
    it "logs in with correct credentials" do
      post "/api/session", params: { credential: user.email, password: "password123" }
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["user"]["id"]).to eq(user.id)
      expect(body["user"]["email"]).to eq("jason@example.com")
    end

    it "rejects a wrong password" do
      post "/api/session", params: { credential: user.email, password: "wrongpassword" }
      expect(response).to have_http_status(:unauthorized)
      body = JSON.parse(response.body)
      expect(body["errors"]).to be_present
    end
  end

  describe "GET /api/session" do
    it "returns the current user after login" do
      post "/api/session", params: { credential: user.email, password: "password123" }
      get "/api/session"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body["user"]["id"]).to eq(user.id)
    end

    it "returns a nil user when logged out" do
      get "/api/session"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body).to eq({ "user" => nil })
    end
  end

  describe "DELETE /api/session" do
    it "logs out" do
      post "/api/session", params: { credential: user.email, password: "password123" }
      delete "/api/session"
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body).to eq({ "message" => "success" })

      get "/api/session"
      expect(JSON.parse(response.body)).to eq({ "user" => nil })
    end
  end
end
