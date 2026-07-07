require "rails_helper"

RSpec.describe Item, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:item)).to be_valid
    end

    it "is invalid without a name" do
      expect(build(:item, name: nil)).not_to be_valid
    end

    it "is invalid without a cost" do
      expect(build(:item, cost: nil)).not_to be_valid
    end

    it "is invalid without a category" do
      expect(build(:item, category: nil)).not_to be_valid
    end

    it "is invalid without a description" do
      expect(build(:item, description: nil)).not_to be_valid
    end

    it "is valid without stock" do
      expect(build(:item, stock: nil)).to be_valid
    end
  end

  describe "associations" do
    it "destroys dependent reviews when destroyed" do
      item = create(:item)
      create(:review, item: item)
      expect { item.destroy }.to change { Review.count }.by(-1)
    end

    it "destroys dependent cart_items when destroyed" do
      item = create(:item)
      create(:cart_item, item_id: item.id)
      expect { item.destroy }.to change { CartItem.count }.by(-1)
    end
  end
end
