function g(s) {
	function goal(s, acc) {
		if(s) return acc + s;
		else return function(x) { return goal(x, acc + 'o'); }
	}
	return goal(s, 'g');
}
