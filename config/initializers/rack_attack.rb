class Rack::Attack
  # DOS攻撃の制御
  throttle('req/ip', limit: 300, period: 5.minutes, &:ip)
   # エラーハンドリング
  self.throttled_response = ->(_env) do
    [503, {}, ["Server Error\n"]]
  end
end
