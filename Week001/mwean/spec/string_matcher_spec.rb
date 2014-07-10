require_relative '../string_matcher'

describe StringMatcher do
  describe '.match_by_iteration' do
    it 'requires the correct number of matches' do
      expect(StringMatcher.match_by_iteration('abcabc', 'abc', 2)).to eq(true)
      expect(StringMatcher.match_by_iteration('abcabc', 'abc', 1)).to eq(false)

      expect(StringMatcher.match_by_iteration('Hello Jello', 'ello', 2)).to eq(true)
      expect(StringMatcher.match_by_iteration('Hello Jello', 'ello', 3)).to eq(false)

      expect(StringMatcher.match_by_iteration('Ratatattat', 'at', 4)).to eq(true)
      expect(StringMatcher.match_by_iteration('Ratatattat', 'at', 3)).to eq(false)
    end

    it 'does not allow overlapping matches' do
      expect(StringMatcher.match_by_iteration('oooo', 'ooo', 2)).to eq(false)
    end
  end

  describe '.match_by_recursion' do
    it 'requires the correct number of matches' do
      expect(StringMatcher.match_by_recursion('abcabc', 'abc', 2)).to eq(true)
      expect(StringMatcher.match_by_recursion('abcabc', 'abc', 1)).to eq(false)

      expect(StringMatcher.match_by_recursion('Hello Jello', 'ello', 2)).to eq(true)
      expect(StringMatcher.match_by_recursion('Hello Jello', 'ello', 3)).to eq(false)

      expect(StringMatcher.match_by_recursion('Ratatattat', 'at', 4)).to eq(true)
      expect(StringMatcher.match_by_recursion('Ratatattat', 'at', 3)).to eq(false)
    end

    it 'does not allow overlapping matches' do
      expect(StringMatcher.match_by_recursion('oooo', 'ooo', 2)).to eq(false)
    end
  end
end
