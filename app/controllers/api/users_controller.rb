class Api::UsersController < ApplicationController
  def destroy
    @user = User.find(params[:id])
    log_out
    render :show
  end

  def sample
    limit = params[:limit] || 3
    sample_businesses = Yelp.client.search(
      'San Francisco', { limit: limit, offset: 3 * rand(10) }
    )

    @sample_users = []
    sample_businesses.businesses.each do |business|
      sample = Yelp.client.business(URLify.deaccentuate(business.id))
      sample_user = sample.reviews.first.user
      @sample_users.push sample_user
    end
  end

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
end
