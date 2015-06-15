class Api::BusinessesController < ApplicationController
  def index
    if params[:searchKeys]
      @businesses = Business.where('name LIKE ?', '%' + params[:searchKeys] + '%').all
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
