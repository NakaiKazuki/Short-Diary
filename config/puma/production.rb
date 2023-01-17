# frozen_string_literal: true

workers Integer(ENV.fetch('WEB_CONCURRENCY', nil) || 2)
max_threads_count = ENV.fetch('RAILS_MAX_THREADS', 5)
min_threads_count = ENV.fetch('RAILS_MIN_THREADS') { max_threads_count }
threads min_threads_count, max_threads_count

preload_app!

# rackup      DefaultRackup
port ENV.fetch('PORT', 3000)
environment ENV.fetch('RAILS_ENV', 'production')

on_worker_boot do
  ActiveRecord::Base.establish_connection
end

plugin :tmp_restart

app_dir = File.expand_path('../..', __dir__)
bind "unix://#{app_dir}/tmp/sockets/puma.sock"
pidfile ENV.fetch('PIDFILE', 'tmp/pids/server.pid')
state_path "#{app_dir}/tmp/pids/puma.state"
stdout_redirect "#{app_dir}/log/puma.stdout.log", "#{app_dir}/log/puma.stderr.log", true
