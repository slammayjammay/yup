class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.find_by_sql(
      "
      SELECT DISTINCT
        users.id AS user_id,
        users.first_name,
        users.last_name,
        users.image_url,
        reviews.created_at,
        reviews.rating,
        reviews.content,
        reviews.business_id
      FROM
        (SELECT *
        FROM followings
        WHERE followings.follower_id = #{current_user.id}) AS sq
      INNER JOIN reviews ON reviews.user_id = sq.followed_id OR reviews.user_id = sq.follower_id
      INNER JOIN users on reviews.user_id = users.id
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
