class Api::UsersController < ApplicationController
  def show
    if params[:isYelpUser]
      render json: {
        id: params[:id],
        name: params[:name],
        image_url: params[:imageUrl],
        isYelpUser: true
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
