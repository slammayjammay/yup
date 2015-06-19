class Api::BusinessesController < ApplicationController
  def index
    @page = params[:page] || 1

    wildcard = "%#{params[:searchKeys].downcase}%" if params[:searchKeys]
    order = params[:order] || 'id'
    dir = order == 'name' ? 'ASC' : 'DESC'

    @businesses = Business.where(
      'name LIKE ? OR category LIKE ?',
      wildcard,
      wildcard
    ).includes(:reviews).order("#{order} #{dir}").page(params[:page]).per(10)
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
