class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render :show
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
