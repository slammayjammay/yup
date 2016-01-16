json.array! @sample_reviews do |review|
  json.extract! review, :rating, :excerpt, :user, :time_created
end
