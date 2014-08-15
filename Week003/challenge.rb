def foldFromRight(method, memo, ary)
  reversed = ary.reverse

  reversed.each { |item| method.call(item, memo) }
end

def foldFromLeft(method, memo, ary)
  foldFromRight(method, memo, ary.reverse)
end

def mapListFromLeft(method, ary)
  [].tap do |new_ary|
    wrapped_method = ->(item, memo) { memo.concat([method.call(item)]) }

    foldFromLeft(wrapped_method, new_ary, ary)
  end
end

def filterListFromLeft(method, ary)
  [].tap do |new_ary|
    wrapped_method = ->(item, memo) { memo.concat([item]) if method.call(item) }

    foldFromLeft(wrapped_method, new_ary, ary)
  end
end

def findInList(method, ary)
  filterListFromLeft(method, ary).first
end
