it("should import an identifier from a module", function() {
	import {a, b as B} from "abc";
	a.should.be.eql("a");
	B.should.be.eql("b");
});

it("should import a module", function() {
	import def from "def";
	def.should.be.eql("def");
});

it("should export functions", function() {
	import { fn } from "exportKinds";
	fn.should.have.type("function");
	fn().should.be.eql("fn");
});

it("should multiple variables with one statement", function() {
	import { one, two } from "exportKinds";
	one.should.be.eql("one");
	two.should.be.eql("two");
});

it("should still be able to use exported stuff", function() {
	import { test1, test2 } from "exportKinds";
	test1.should.be.eql("fn");
	test2.should.be.eql("two");
});
