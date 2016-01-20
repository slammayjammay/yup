class Api::BusinessesController < ApplicationController
  def index
    @page = params[:page].to_i || 1
    result_limit = 5

    term = params[:searchKeys] || 'food'
    @businesses = Yelp.client.search(
      'San Francisco',
      {
        term: term,
        limit: result_limit,
        offset: result_limit * @page,
        category_filter: params[:category]
      }
    ).businesses
  end

  def show
    business_id = URLify.deaccentuate(params[:id])
    @business = Yelp.client.business(business_id)
    @reviews = Review.where(business_id: business_id).includes(:user)

    @images = []
    2.times { @images.push Image.find(rand(Image.count - 1) + 1).url }
  end
end
