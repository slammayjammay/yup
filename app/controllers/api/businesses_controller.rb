class Api::BusinessesController < ApplicationController
  def index
    if params[:searchKeys]
      # @businesses = Business.where('name LIKE ?', '%' + params[:searchKeys] + '%').all
      # @businesses.push Business.where('category LIKE ?', '%' + params[:searchKeys] + '%').all
      wildcard = "%#{params[:searchKeys]}"
      @businesses = Business.where('name LIKE ? OR category LIKE ?', wildcard, wildcard)
    else
      @businesses = Business.all
    end
    p @businesses
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
