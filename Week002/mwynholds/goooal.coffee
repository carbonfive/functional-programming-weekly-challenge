g = (str, memo = 'g') ->
  return "#{memo}#{str}" if str?
  (str) -> g(str, "#{memo}o")

assert = (value) ->
  process.stdout.write ( if value then '.' else 'F' )

assert g('al') == 'gal'
assert g()('al') == 'goal'
assert g()()()()()()()('al') == 'goooooooal'
console.log ''
