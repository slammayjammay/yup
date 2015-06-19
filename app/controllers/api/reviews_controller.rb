class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.find_by_sql(
      "SELECT
        reviews.rating,
        reviews.content,
        reviewer.id AS user_id,
        reviewer.first_name,
        reviewer.last_name,
        reviewer.image_url,
        businesses.id AS business_id,
        businesses.name AS business_name,
        reviews.created_at
      FROM followings
      INNER JOIN users ON users.id = followings.follower_id
      INNER JOIN reviews ON reviews.user_id = followings.followed_id
      INNER JOIN users AS reviewer ON followings.followed_id = reviewer.id
      INNER JOIN businesses ON reviews.business_id = businesses.id
      WHERE users.id = 51
      ORDER BY reviews.created_at DESC
      LIMIT 10;"
    )

    render :index
  end

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    if @review.save
      business = Business.find(@review.business_id)
      rating = @review.rating

      business.review_count += 1
      diff = rating - business.rating
      business.rating += diff.fdiv(business.review_count)
      business.save
      render :show
    else
      render json: @review.errors, status: 422
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  private

  def review_params
    params.permit(:business_id, :rating, :content, :price)
  end
end
