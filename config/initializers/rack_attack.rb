class Rack::Attack
  throttle('req/ip', limit: 60, period: 1.minute, &:ip)
end