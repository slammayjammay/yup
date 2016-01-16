json.array! @sample_reviews do |review|
  json.business_id review.instance_variable_get :@business_id
  json.extract! review, :rating, :excerpt, :user, :time_created
end
