class Api::BusinessesController < ApplicationController
  def show
    @business = Business.find(params[:id])
    render :show
  end
end
