class Api::FollowingsController < ApplicationController
  def create
    @following = Following.new(following_params)
    @following.save
    render :show
  end

  def show
    @following = Following.find(params[:id])
    render :show
  end

  def destroy
    @following = Following.find(params[:id])
    @following.destroy
    render :show
  end

  private

  def following_params
    params.require(:following).permit(:follower_id, :followed_id)
  end
end
