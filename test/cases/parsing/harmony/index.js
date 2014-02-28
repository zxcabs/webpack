it("should import an identifier from a module", function() {
	import {a, b as B} from "abc";
	a.should.be.eql("a");
	B.should.be.eql("b");
});

it("should exports should be enumberable", function() {
	import abc from "abc";
	var array = [];
	for(var x in abc) {
		array.push(x);
	}
	array.should.be.eql(["a", "b", "c"]);
});

it("should import a module with module statement", function() {
	import { value } from "importWithModule";
	Object.keys(value).should.be.eql(["a", "b", "c"]);
});

it("should import a module"/*, function() {
	import def from "def";
	def.should.be.eql("def");
}*/);

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

it("should reexport a module", function() {
	import { a, b, c, o, two, test1 } from "reexport";
	a.should.be.eql("a");
	b.should.be.eql("b");
	c.should.be.eql("c");
	o.should.be.eql("one");
	two.should.be.eql("two");
	(typeof test1).should.be.eql("undefined");
});

it("should support inline modules", function() {
	import { a, getValue, setValue, g, s, gg } from "inlineModule";
	a.should.be.eql("a");
	getValue().should.be.eql(123);
	g().should.be.eql(123);
	gg().should.be.eql(123);
	setValue(456)
	getValue().should.be.eql(456);
	g().should.be.eql(456);
	gg().should.be.eql(123);
	s(135)
	getValue().should.be.eql(135);
	g().should.be.eql(135);
	gg().should.be.eql(123);
});
