class String
  def goooal!()
    _goooal self, ''
  end

  def _goooal(str, memo)
    return memo if str.empty?
    if str =~ /^\(\)/
      _goooal str[2..-1], (memo + 'o')
    elsif str[0] =~ /[a-zA-Z]/
      _goooal str[1..-1], (memo + str[0])
    else
      _goooal str[1..-1], memo
    end
  end
end

def assert(value)
  print ( value ? '.' : 'F' )
end

assert 'g()()()()()()()("al")'.goooal! == 'goooooooal'
assert 'g()("al")'.goooal! == 'goal'
assert 'g(’al’)'.goooal! == 'gal'

puts ''
