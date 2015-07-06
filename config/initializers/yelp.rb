require 'yelp'
require 'google/apis/plus_v1'

Yelp.client.configure do |config|
  config.consumer_key = "AX3Iec4w62LjNfO0gwSvhg"
  config.consumer_secret = "aJom9A5-BK4O2wE-zJGL9kgtEUs"
  config.token = "4FMJo_vm1B9fizAp-NG5yHn_uaVyTkyh"
  config.token_secret = "dglYUEmZntH5R_wUn262fwmK9m4"
end

plus = Google::Apis::PlusV1::PlusService.new
plus.key = 'AIzaSyC4L1jO9M5kzajfRopb7i2w2tSIGiXlkYY'
