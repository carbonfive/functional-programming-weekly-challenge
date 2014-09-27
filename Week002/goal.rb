def g
  o('g')
end

def o(existing)
  ->(str = nil) { str ? "#{existing}#{str}" : o(existing + 'o') }
end
