@items.each do |item|
    json.set! item.id do
      json.extract! item, :id, :name, :cost, :category, :stock, :description
      json.set! "imageUrl", item.photo.attached? ? item.photo.url : nil
    end
end