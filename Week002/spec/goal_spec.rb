require 'rspec'
require_relative '../goal'

describe 'g' do
  it 'returns the correct string' do
    expect(g[][][][]['al']).to eq('gooooal')
    expect(g[]['al']).to eq('goal')
    expect(g['al']).to eq('gal')
  end
end
