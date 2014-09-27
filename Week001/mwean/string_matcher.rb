class StringMatcher
  class << self
    def match_by_iteration(input, search_str, count)
      matches = []
      input_ary = input.chars
      search_ary = search_str.chars
      search_size = search_str.size

      input_ary.each_cons(search_size).each_with_index do |sub_ary, i|
        next unless sub_ary == search_ary

        range = i...(i + search_size)
        matches << range unless matches.any? { |match| match.cover?(range.first) }
      end

      matches.size == count
    end

    def match_by_recursion(input, search_str, count)
      matches = []
      input_ary = input.chars
      search_ary = search_str.chars

      match_sub_array(input_ary, search_ary, matches, 0)

      matches.size == count
    end

    def match_sub_array(sub_ary, search_ary, matches, index)
      end_index = index + search_ary.size

      if sub_ary[index...end_index] == search_ary
        matches << index
        next_index = end_index
      else
        next_index = index + 1
      end

      match_sub_array(sub_ary, search_ary, matches, next_index) unless next_index >= sub_ary.size
    end
  end
end
