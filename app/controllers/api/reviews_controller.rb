class Api::ReviewsController < ApplicationController
  def index
    @reviews = Review.all
  end

  def create
    @review = Review.new(review_params)
    @review.user_id = current_user.id

    if @review.save
      render :show
    else
      render json: @review.errors, status: 422
    end
  end

  def sample
    limit = params[:limit] || 3
    sample_businesses = Yelp.client.search(
      'San Francisco', { limit: limit, offset: 3 * rand(10) }
    )

    @sample_reviews = []
    sample_businesses.businesses.each do |business|
      sample = Yelp.client.business(URLify.deaccentuate(business.id))
      sample_review = sample.reviews.first
      sample_review.instance_variable_set(:@business_id, business.id)
      @sample_reviews.push(sample_review)
    end
  end

  def show
    @review = Review.find(params[:id])
  end

  private

  def review_params
    params.permit(:business_id, :rating, :excerpt)
  end
end
