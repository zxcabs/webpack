module "math" {
	export function add() {
		var sum = 0, i = 0, args = arguments, l = args.length;
		while (i < l) {
			sum += args[i++];
		}
		return sum;
	}
}

import { add } from 'math';
export function increment(val) {
    return add(val, 1);
};