class Api::ReviewsController < ApplicationController
  def index
    @reviews = yelp_clone_development.execute(<<-SQL)
      SELECT reviews.rating
      FROM followings
      INNER JOIN users ON users.id = followings.follower_id
      INNER JOIN reviews ON reviews.user_id = followings.followed_id
      WHERE users.id = 51
      ORDER BY reviews.created_at DESC
      LIMIT 10;
    SQL

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
