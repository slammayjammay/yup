json.extract! @business, :id, :name, :rating, :review_count, :location,
  :snippet_text, :categories
json.extract! @business, :image_url if @business.respond_to? :image_url

json.yelp_reviews @yelp_reviews do |review|
  json.extract! review, :rating, :excerpt, :user, :time_created
end

json.sample_images @images
