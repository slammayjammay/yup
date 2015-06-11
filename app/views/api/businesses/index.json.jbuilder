json.array! @businesses do |business|
  json.extract! business, :id, :name, :category, :address, :city, :state, :image_url, :reviews
end
