class RetrospectivesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_retrospective, only: [:edit, :update, :destroy, :show]
  respond_to :html

  def index
    @retrospectives = Retrospective.has_user current_user.id
  end

  def new
    @retrospective = Retrospective.new
  end

  def create
    @retrospective = Retrospective.new retrospective_params
    @retrospective.retrospective_users.build user: current_user
    @retrospective.save
    respond_with @retrospective
  end

  def edit
  end

  def update
    @retrospective.update retrospective_params
    respond_with @retrospective
  end

  def destroy
    @retrospective.destroy
  end

  def show
  end

  private

  def set_retrospective
    @retrospective = Retrospective.has_user(current_user.id).find params[:id]
  end

  def retrospective_params
    params[:retrospective].permit(:title)
  end
end
