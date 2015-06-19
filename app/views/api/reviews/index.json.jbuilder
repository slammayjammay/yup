json.array! @reviews do |review|
  json.extract! review, :rating, :content
end
