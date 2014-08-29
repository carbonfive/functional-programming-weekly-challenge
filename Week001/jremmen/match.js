function match(s1, s2, n) {
	function iter(a, b, acc) {
		if (!b.length) return iter(a, s2, acc + 1);
		else if (!a.length) return acc;
		else {
			if(a[0] == b[0]) return iter(a.slice(1), b.slice(1), acc);
			else return iter(a.slice(1), s2, acc);
		}
	}
	return iter(s1, s2, 0) == n;
}
