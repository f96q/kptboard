class ReviewUsersController < ApplicationController
  def show
    if current_user
      redirect_to new_user_session_path
    end
    user = User.find_by(id: params[:id])
    sign_in(user) if user
    redirect_to new_user_session_path
  end
end
