require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    subject { build(:user) }

    it { should allow_value("real@example.com").for(:email) }
    it { should_not allow_value("not-an-email").for(:email) }
    it { should have_secure_password }
    it { should validate_length_of(:password).is_at_least(6) }

    it "requires a unique username" do
      create(:user, username: "dupe")
      expect(build(:user, username: "dupe")).not_to be_valid
    end

    it "requires a unique email" do
      create(:user, email: "dupe@example.com")
      expect(build(:user, email: "dupe@example.com")).not_to be_valid
    end
  end

  describe "session token" do
    it "assigns a session token before validation" do
      user = build(:user, session_token: nil)
      user.valid?
      expect(user.session_token).to be_present
    end

    it "resets the session token to a new value" do
      user = create(:user)
      old = user.session_token
      expect(user.reset_session_token!).not_to eq(old)
      expect(user.reload.session_token).not_to eq(old)
    end
  end

  describe ".find_by_credentials" do
    let!(:user) { create(:user, username: "jason", email: "jason@example.com", password: "password123") }

    it "authenticates by username" do
      expect(User.find_by_credentials("jason", "password123")).to eq(user)
    end

    it "authenticates by email" do
      expect(User.find_by_credentials("jason@example.com", "password123")).to eq(user)
    end

    it "returns nil for a wrong password" do
      expect(User.find_by_credentials("jason", "wrong")).to be_nil
    end

    it "returns nil for an unknown credential" do
      expect(User.find_by_credentials("nobody", "password123")).to be_nil
    end
  end
end
