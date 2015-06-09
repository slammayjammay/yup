class StaticPagesController < ApplicationController
  before_action :require_log_in

  def root
  end
end
