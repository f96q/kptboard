WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.

  namespace :retrospectives do
    subscribe :open, to: Ws::RetrospectivesController, with_method: :open
    subscribe :add_user, to: Ws::RetrospectivesController, with_method: :add_user
    subscribe :remove_user, to: Ws::RetrospectivesController, with_method: :remove_user
  end

  namespace :labels do
    subscribe :create,  to: Ws::LabelsController, with_method: :create
    subscribe :destroy, to: Ws::LabelsController, with_method: :destroy
    subscribe :update,  to: Ws::LabelsController, with_method: :update
    subscribe :update_position, to: Ws::LabelsController, with_method: :update_position
  end
end
