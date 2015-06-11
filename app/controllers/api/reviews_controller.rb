class Api::ReviewsController < ApplicationController
  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id
    @review.save
    render :show
  end

  def show
    @review = Review.find(params[:id])
  end

  private

  def review_params
    params.permit(:business_id, :rating, :content)
  end
end
