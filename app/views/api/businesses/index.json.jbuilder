# json.page @page

# json.businesses @businesses do |business|
#   json.extract! business, :id, :name, :rating, :review_count, :category,
#     :address_line_1, :address_line_2, :city, :state, :image_url, :reviews,
#     :latitude, :longitude
# end

json.businesses @businesses do |business|
  json.extract! business, :name, :rating, :review_count, :location, :image_url,
    :snippet_text
end
