FactoryBot.define do
  factory :review do
    association :item
    ratings { 5 }
    body { "Great product, highly recommend." }
    author { "Reviewer" }
  end
end
