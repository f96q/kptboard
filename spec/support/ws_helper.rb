module WsHelper
  def sign_in(user)
    Ws::BaseController.class_eval do
      @@current_user = user

      def current_user
        @@current_user
      end

      def trigger_channel(name, params)
        trigger_success params
      end
    end
  end
end
