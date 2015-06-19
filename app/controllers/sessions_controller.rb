class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      log_in @user
      redirect_to "#"
    else
      flash.now[:errors] = "Invalid credentials"
      render :new
    end
  end

  def destroy
    log_out
    redirect_to new_session_url
  end

  def new
    @user = User.new
  end
end
