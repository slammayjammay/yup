class Api::BusinessesController < ApplicationController
  def index
    if params[:searchKeys]
      wildcard = "%#{params[:searchKeys]}%"
      order = params[:order] || 'id'
      dir = order == 'name' ? 'ASC' : 'DESC'

      @businesses = Business.where('name LIKE ? OR category LIKE ?', wildcard, wildcard)
      .order("#{order} #{dir}")
    else
      @businesses = Business.all
    end
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
