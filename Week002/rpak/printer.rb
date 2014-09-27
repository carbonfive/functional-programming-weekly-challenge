#! /usr/bin/ruby

def print_result(result)
  red, green = 31, 32
  color_code = result ? green : red
  message = result ? '.' : 'F'
  printf "\033[#{color_code}m#{message}\033[0m"
end
