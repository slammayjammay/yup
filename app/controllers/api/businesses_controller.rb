class Api::BusinessesController < ApplicationController
  def index
    @page = params[:page] || 1

    # if params[:bestOf]
    #   @businesses = Business.all.order('rating DESC')
    #   .order('review_count DESC').page(params[:page]).per(10)
    # else
    #   wildcard = "%#{params[:searchKeys].downcase}%" if params[:searchKeys]
    #   order = params[:order] || 'id'
    #   dir = order == 'name' ? 'ASC' : 'DESC'
    #   @businesses = Business.where(
    #     'name LIKE ? OR category LIKE ?',
    #     wildcard,
    #     wildcard
    #   ).includes(:reviews).order("#{order} #{dir}").page(params[:page]).per(10)
    # end

    @businesses = Yelp.client.search(
      'San Francisco',
      { term: params[:searchKeys], limit: 10 }
    ).businesses
  end


  def show
    @business = Business.find(params[:id])
  end
end
