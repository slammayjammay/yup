class Api::BusinessesController < ApplicationController
  def index
    if params[:searchKeys]
      wildcard = "%#{params[:searchKeys]}%"
      @businesses = Business.where('name LIKE ? OR category LIKE ?', wildcard, wildcard)
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
