FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "Item #{n}" }
    cost { 19.99 }
    category { "Mouse" }
    stock { 10 }
    description { "A dependable gaming item." }
  end
end
