class Api::UsersController < ApplicationController
  def show
    if params[:yelpUser]
      render json: {
        name: params[:name],
        image_url: params[:imageUrl],
        reviews: [],
        followers: [],
        followings: []
      }
    else
      @user = User.where(id: params[:id]).includes(:reviews, :followers, :follows).first
    end
  end

  def update
    @user = User.find(current_user.id)
    @user.update(user_params)
    render :show
  end

  def destroy
    @user = User.find(params[:id])
    log_out
    render :show
  end
end
