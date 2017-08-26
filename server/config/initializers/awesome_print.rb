if Rails.env.development? || Rails.env.test?
  require "awesome_print"
  AwesomePrint.irb!
end
