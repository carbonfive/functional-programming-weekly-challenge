require 'rspec'
require_relative '../challenge'

def concatter(item, memo)
  memo + [item]
end

def doubler(item)
  item * 2
end

def only_twos(item)
  item == 2
end

describe 'foldFromRight' do
  it 'does the right thing' do
    memo = [].freeze
    list = [5, 4, 25].freeze

    expect(foldFromRight(method(:concatter), memo, list)).to eq([25, 4, 5])
  end
end

describe 'foldFromLeft' do
  it 'does the right thing' do
    memo = [].freeze
    list = [5, 4, 25].freeze

    expect(foldFromLeft(method(:concatter), memo, list)).to eq([5, 4, 25])
  end
end

describe 'mapListFromLeft' do
  it 'does the right thing' do
    list = [10, 20, 30].freeze

    expect(mapListFromLeft(method(:doubler), list)).to eq([20, 40, 60])
  end
end

describe 'filterListFromLeft' do
  it 'does the right thing' do
    list = [1, 2, 3, 2].freeze

    expect(filterListFromLeft(method(:only_twos), list)).to eq([2, 2])
  end
end

describe 'findInList' do
  it 'does the right thing' do
    list = [1, 2, 3, 2].freeze

    expect(findInList(method(:only_twos), list)).to eq(2)
  end

  it 'returns nil if no match is found' do
    list = [1, 3, 4, 5].freeze

    expect(findInList(method(:only_twos), list)).to eq(nil)
  end
end
