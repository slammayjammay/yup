class StaticPagesController < ApplicationController
  before_action :require_log_in, only: :root

  def about
  end

  def root
  end
end
