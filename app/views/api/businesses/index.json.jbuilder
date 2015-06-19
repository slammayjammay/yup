json.page @page

json.businesses @businesses do |business|
  json.extract! business, :id, :name, :rating, :review_count, :category,
    :address, :city, :state, :image_url, :reviews, :latitude, :longitude
end
