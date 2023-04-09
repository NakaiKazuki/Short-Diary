# frozen_string_literal: true
# if Rails.env.production?
#   config = Rails.application.config_for(:google_analytics)
#   if config['enabled']
#     require 'staccato'
#     tracker = Staccato.tracker(config['tracking_id'])

#     ActiveSupport::Notifications.subscribe 'process_action.action_controller' do |_name, start, finish, _id, payload|
#       tracker.event(category: 'API', action: "#{payload[:controller]}##{payload[:action]}", label: (payload[:format]).to_s, value: finish - start,
#                     cid: SecureRandom.uuid)
#     end
#   end
# end
