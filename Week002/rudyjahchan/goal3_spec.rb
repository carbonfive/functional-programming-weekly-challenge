require 'minitest/autorun'
require 'minitest/spec'
require './goal3'

describe '#g' do
  describe 'given repeated calls of o' do
    subject { g.().().().().().('al')}

    it 'returns a string containing that number of o' do
      subject.must_equal 'goooooal'
    end
  end

  describe 'given one call of o' do
    subject { g.().('al') }

    it 'returns a string containing that number of o' do
      subject.must_equal 'goal'
    end
  end

  describe 'given a string' do
    subject { g 'al' }

    it 'prepends g to the string' do
      subject.must_equal 'gal'
    end
  end
end
