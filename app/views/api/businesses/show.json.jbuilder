json.extract! @business, :id, :name, :rating, :review_count, :location, :snippet_text
json.extract! @business, :image_url if @business.respond_to? :image_url

json.reviews @reviews do |review|
  json.extract! review, :rating, :excerpt, :user
end
