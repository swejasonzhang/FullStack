require "rails_helper"

RSpec.describe CartItem, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:cart_item)).to be_valid
    end

    it "is invalid without a user_id" do
      expect(build(:cart_item, user_id: nil)).not_to be_valid
    end

    it "is invalid without an item_id" do
      expect(build(:cart_item, item_id: nil)).not_to be_valid
    end

    it "is invalid without a quantity" do
      expect(build(:cart_item, quantity: nil)).not_to be_valid
    end

    it "is invalid without a name" do
      expect(build(:cart_item, name: nil)).not_to be_valid
    end

    it "is invalid without a description" do
      expect(build(:cart_item, description: nil)).not_to be_valid
    end

    it "is invalid without a cost" do
      expect(build(:cart_item, cost: nil)).not_to be_valid
    end

    it "is invalid without an image_url" do
      expect(build(:cart_item, image_url: nil)).not_to be_valid
    end
  end
end
