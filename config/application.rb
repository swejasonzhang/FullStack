require_relative "boot"

require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_view/railtie"

Bundler.require(*Rails.groups)

module Amazeon
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore,
      key: "_amazeon_session",
      same_site: :lax,
      secure: Rails.env.production?
  end
end
