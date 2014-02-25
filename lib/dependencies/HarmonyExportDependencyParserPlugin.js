/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var AbstractPlugin = require("../AbstractPlugin");
var HarmonyExportDependency = require("./HarmonyExportDependency");

module.exports = AbstractPlugin.create({
	"export declaration": function(statement, name) {
		var dep = new HarmonyExportDependency(name, statement.range, statement.declaration.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"export named": function(statement, mapIdentifierToName, request) {
		if(request) throw new Error("TODO: HarmonyImportExportDependency");
		var dep = new HarmonyExportDependency(mapIdentifierToName, statement.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"export": function(statement, request) {
		throw new Error("TODO: HarmonyImportExportDependency");
	}
});

