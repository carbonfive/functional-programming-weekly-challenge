describe('Week002', function(){
  it('says gal', function(){
    expect(g('al')).toEqual('gal');
  });

  it('says goal', function(){
    expect(g()('al')).toEqual('goal');
  });

  it('says goooooooal', function(){
    expect(g()()()()()()()('al')).toEqual('goooooooal');
  });
});
