class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    @review.save

    business = Business.find(@review.business_id)
    rating = @review.rating

    business.review_count += 1
    diff = rating - business.rating
    business.rating += diff.fdiv(business.review_count)
    business.save!
    render :show
  end

  def show
    @review = Review.find(params[:id])
  end

  private

  def review_params
    params.permit(:business_id, :rating, :content, :price)
  end
end
