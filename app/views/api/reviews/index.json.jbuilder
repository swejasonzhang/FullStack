@reviews.each do |review|
  json.set! review.id do 
    json.extract! review, :item_id, :ratings, :body, :author, :review_id
  end
end