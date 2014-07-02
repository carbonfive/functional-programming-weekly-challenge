#!/usr/bin/env ruby

match = lambda do |s1, p, occ|
  _match = lambda do |s2, acc|
    return acc if s2.empty?
    return _match.call *(s2.index(p) == 0 ? [s2[p.length..-1], acc+1] : [s2[1..-1], acc])
  end

  _match[s1, 0] == occ
end

puts (match['abcabc', 'abc', 1] == false)
puts (match['abcabc', 'abc', 2] == true)
puts (match['Hello Jello', 'ello', 2] == true)
puts (match['Hello Jello', 'ello', 3] == false)
puts (match['Ratatattat', 'at', 3] == false)
puts (match['Ratatattat', 'at', 4] == true)
puts (match['oooo', 'ooo', 2] == false) # overlapping example
