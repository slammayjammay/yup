json.extract! @business, :id, :name, :rating, :review_count, :location,
  :snippet_text
json.extract! @business, :image_url if @business.respond_to? :image_url

json.reviews @reviews do |review|
  json.extract! review, :rating, :excerpt, :business_id, :created_at
  json.user review.user, :id, :name, :image_url
end

json.sample_images @images
