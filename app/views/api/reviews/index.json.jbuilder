json.array! @reviews do |review|
  json.extract! review, :rating, :content, :first_name, :last_name,
    :business_name, :business_id, :image_url, :created_at, :user_id
end
