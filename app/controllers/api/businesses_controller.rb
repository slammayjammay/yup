class Api::BusinessesController < ApplicationController
  def index
    @page = params[:page].to_i || 1
    result_limit = 5

    term = params[:searchKeys] || 'food'
    @businesses = Yelp.client.search(
      'San Francisco',
      { term: term, limit: result_limit, offset: result_limit * @page }
    ).businesses
  end


  def show
    business_name = URLify.deaccentuate params[:id]
    @business = Yelp.client.business(business_name)
  end
end
