# frozen_string_literal: true

workers Integer(ENV.fetch('WEB_CONCURRENCY', nil) || 2)
threads_count = Integer(ENV.fetch('RAILS_MAX_THREADS', nil) || 5)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV.fetch('PORT', nil)     || 3000
environment ENV.fetch('RACK_ENV', nil) || 'production'

on_worker_boot do
  ActiveRecord::Base.establish_connection
end

plugin :tmp_restart

app_dir = File.expand_path('../..', __dir__)
bind "unix://#{app_dir}/tmp/sockets/puma.sock"
pidfile "#{app_dir}/tmp/pids/puma.pid"
state_path "#{app_dir}/tmp/pids/puma.state"
stdout_redirect "#{app_dir}/log/puma.stdout.log", "#{app_dir}/log/puma.stderr.log", true
