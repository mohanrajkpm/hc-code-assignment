Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # Routes with name for question, role & mapping
  namespace :api do
    namespace :v1 do
      resources :questions, only: %i[index create show update destroy] do
        collection do
          get :fetch_roles, :fetch_mappings
        end
      end
    end
  end
end
