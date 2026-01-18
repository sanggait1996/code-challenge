/*
Replace var to const 
*/

/*
// Method A: Most performant & cleanest mathematical solution
// Time: O(1)    Space: O(1)
// Using Gauss's formula: n * (n + 1) / 2
// Using bitwise right shift for integer division → faster & avoids floating point
*/
const sum_to_n_a = function (n) {
	return (n * (n + 1)) >>> 1;
};

/*
// Method B: Iterative (classic, very clear, safe for very large n)
// Time: O(n)    Space: O(1)
// Most interviewers still consider this "good enough" for n ≤ 10^7~10^8
*/
const sum_to_n_b = function (n) {
	let sum = 0;

	for (let i = 1; i <= n; i++) {
		sum += i;
	}

	return sum;
};

/*
// Method C: Recursive (most elegant looking, but most dangerous in practice)
// Time: O(n)    Space: O(n)  ← can cause stack overflow!
// Usually used to demonstrate understanding of recursion & its limitations
*/
const sum_to_n_c = function (n) {
	if (n <= 1) return n;

	return n + sum_to_n_c(n - 1);
};

/*
Run some test cases
*/
console.log('================ TEST CASES ================');

console.log(sum_to_n_a(0));
console.log(sum_to_n_a(1));
console.log(sum_to_n_a(15));
console.log(sum_to_n_a(55));
console.log(sum_to_n_a(5050));

console.log('------------------------------------------');

console.log(sum_to_n_b(0));
console.log(sum_to_n_b(1));
console.log(sum_to_n_b(15));
console.log(sum_to_n_b(55));
console.log(sum_to_n_b(5050));

console.log('------------------------------------------');

console.log(sum_to_n_c(0));
console.log(sum_to_n_c(1));
console.log(sum_to_n_c(15));
console.log(sum_to_n_c(55));
console.log(sum_to_n_c(5050));

console.log('================ END TEST ================');
