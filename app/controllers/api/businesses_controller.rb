class Api::BusinessesController < ApplicationController
  def index
    wildcard = "%#{params[:searchKeys]}%"
    order = params[:order] || 'id'
    dir = order == 'name' ? 'ASC' : 'DESC'

    @businesses = Business.where(
      'name LIKE ? OR category LIKE ?',
      wildcard,
      wildcard
    ).order("#{order} #{dir}")
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
