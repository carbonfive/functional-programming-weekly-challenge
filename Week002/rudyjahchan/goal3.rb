def g(tail=nil)
  if tail
    "g#{tail}"
  else
    def o(head)
      ->(tail=nil){ tail ? head + tail : o(head + 'o') }
    end

    o 'g'
  end
end
