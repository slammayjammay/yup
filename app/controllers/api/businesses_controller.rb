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
    business_name = URLify.deaccentuate(params[:id])
    @business = Yelp.client.business(business_name)

    # Get a random category @business fits into. A category is a list of the
    # English writing of category and one for use in an API request, e.g.
    # ['Fish & Chips', 'fishnchips']
    category = @business.categories.sample[1]

    # Yelp's API only responds with a max. of one review per business. For
    # seeding purposes, call for several businesses in the same category
    # and use each of their reviews. TODO: make this async
    @reviews = []
    other_businesses = Yelp.client.search(
      @business.location.city,
      { category_filter: category, limit: 7 }
    )

    other_businesses.businesses.each do |business|
      sample = Yelp.client.business(business.id)
      @reviews.push(sample.reviews.first)
    end
  end
end
