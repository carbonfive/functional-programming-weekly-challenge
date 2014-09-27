#! /usr/bin/ruby

require './printer'

def g(input = nil)
  ohs = []

  o_maker = lambda {|suffix = nil|
    if suffix.nil?
      ohs << 'o'
      return o_maker
    else
      return "g#{ohs.join}#{suffix}"
    end
  }

  return o_maker
end


print_result g.().().().().().().().('al') == 'goooooooal'
print_result g.().('al') == 'goal'
print_result g.('al') == 'gal'

print "\n"
