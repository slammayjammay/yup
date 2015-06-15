class Api::BusinessesController < ApplicationController
  def index
    @businesses = Business.all.page(params[:page]).per(10)
    render :index
  end

  def search
    p params
    @businesses = Business.where(name: params[:searchKeys])
    render '/api/businesses/search.json.jbuilder'
  end

  def show
    @business = Business.find(params[:id])
    render :show
  end
end
