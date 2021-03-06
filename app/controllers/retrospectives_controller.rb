class RetrospectivesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_retrospective, only: [:edit, :update, :destroy, :show, :export]
  respond_to :html

  def index
    @retrospectives = Retrospective.has_user(current_user)
  end

  def new
    @retrospective = Retrospective.new
  end

  def create
    @retrospective = Retrospective.new retrospective_params
    @retrospective.retrospectives_users.build(user: current_user)
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
    redirect_to retrospectives_path
  end

  def show
  end

  def export
    respond_to do |format|
      format.any  { render_send_data 'text/plain', @retrospective.title + '.md' }
    end
  end

  private

  def render_send_data(type, filename)
    data = ApplicationController.render('retrospectives/export', assigns: { retrospective: @retrospective })
    send_data data, type: type, filename: filename
  end

  def set_retrospective
    @retrospective = Retrospective.has_user(current_user).find(params[:id])
  end

  def retrospective_params
    params[:retrospective].permit(:title)
  end
end
