require "rails_helper"

RSpec.describe Review, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:review, item: create(:item))).to be_valid
    end

    it "is invalid without ratings" do
      expect(build(:review, ratings: nil)).not_to be_valid
    end

    it "is invalid without a body" do
      expect(build(:review, body: nil)).not_to be_valid
    end

    it "is invalid without an author" do
      expect(build(:review, author: nil)).not_to be_valid
    end

    it "is invalid without an item_id" do
      expect(build(:review, item: nil, item_id: nil)).not_to be_valid
    end
  end

  describe "associations" do
    it "belongs to an item" do
      item = create(:item)
      review = create(:review, item: item)
      expect(review.item).to eq(item)
    end
  end
end
