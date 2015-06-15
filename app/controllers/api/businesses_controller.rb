class Api::BusinessesController < ApplicationController
  def index
    @businesses = Business.all.page(params[:page]).per(10)
    render :index
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
