# class Rack::Attack
#   # DOS攻撃の制御
#   throttle('req/ip', limit: 300, period: 5.minute, &:ip)
#    # エラーハンドリング
#   self.throttled_response = lambda do |env|
#     [ 503, {}, ["Server Error\n"] ]
#    end
# end
