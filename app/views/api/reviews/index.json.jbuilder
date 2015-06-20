json.array! @reviews do |review|
  json.extract! review, :user_id, :first_name, :last_name, :image_url, :created_at,
    :rating, :content, :business_id
end
