#! /usr/bin/ruby

fold_from_left = lambda {|folder, accumulator, items|
  if items.empty?
    return accumulator
  else
    result = folder.(accumulator, items[0])
    return fold_from_left.(folder, result, items[1..-1])
  end
}

fold_from_right = lambda {|func, accumulator, items|
  return fold_from_left.(func, accumulator, items.reverse)
}

map_list_from_left = lambda {|operation, items|
  folder = lambda {|memo, item|
    return memo + [operation.(item)]
  }
  return fold_from_left.(folder, [], items)
}

filter_list_from_left = lambda {|predicate, items|
  folder = lambda {|memo, item|
    filter = !predicate.(item)
    filter ? memo : memo + [item]
  }
  return fold_from_left.(folder, [], items)
}

find_in_list = lambda {|predicate, items|
  matches = filter_list_from_left.(predicate, items)
  matches.empty? ? nil : matches[0]
}

folded_from_left = fold_from_left.(lambda {|memo, item| return memo.concat([item])}, [], [5, 4, 25])
folded_from_right = fold_from_right.(lambda {|memo, item| return memo.concat([item])}, [], [5, 4, 25])
mapped_list_from_left = map_list_from_left.(lambda {|item| return item * 2}, [10, 20, 30])
filtered_list_from_left = filter_list_from_left.(lambda {|item| return item == 2}, [1, 2, 3, 2])
found_in_list = find_in_list.(lambda {|item| item == 2}, [1, 2, 3, 2])
none_found_in_list = find_in_list.(lambda {|item| item == 4}, [1, 2, 3, 2])

#
# Tests
#

def print_result(result)
  red, green = 31, 32
  color_code = result ? green : red
  message = result ? '.' : 'F'
  printf "\033[#{color_code}m#{message}\033[0m"
end

print_result folded_from_left == [5, 4, 25]
print_result folded_from_right == [25, 4, 5]
print_result mapped_list_from_left == [20, 40, 60]
print_result filtered_list_from_left == [2, 2]
print_result found_in_list == 2
print_result none_found_in_list == nil
print "\n"
