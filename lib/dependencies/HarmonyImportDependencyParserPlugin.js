/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var AbstractPlugin = require("../AbstractPlugin");
var HarmonyImportDependency = require("./HarmonyImportDependency");

module.exports = AbstractPlugin.create({
	"import default": function(statement, identifier, request) {
		var dep = new HarmonyImportDependency(request, identifier, statement.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"import named": function(statement, mapIdentifierToName, request) {
		var dep = new HarmonyImportDependency(request, mapIdentifierToName, statement.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	},
	"import": function(statement, request) {
		var dep = new HarmonyImportDependency(request, null, statement.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		return true;
	}
});

