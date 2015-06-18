class Api::BusinessesController < ApplicationController
  def index
    wildcard = "%#{params[:searchKeys].downcase}%"
    order = params[:order] || 'id'
    dir = order == 'name' ? 'ASC' : 'DESC'

    @businesses = Business.where(
      'name LIKE ? OR category LIKE ?',
      wildcard,
      wildcard
    ).order("#{order} #{dir}").page(params[:page]).per(5)
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
