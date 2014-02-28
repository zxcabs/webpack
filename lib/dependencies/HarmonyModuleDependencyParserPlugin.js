/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var AbstractPlugin = require("../AbstractPlugin");
var HarmonyModuleDependency = require("./HarmonyModuleDependency");
var LocalModulesHelpers = require("./LocalModulesHelpers");

module.exports = AbstractPlugin.create({
	"module": function(statement, name) {
		var localModule = LocalModulesHelpers.addLocalModule(this.state, name);
		var dep = new HarmonyModuleDependency(localModule, statement.range, statement.body.range);
		dep.loc = statement.loc;
		this.state.current.addDependency(dep);
		this.inScope([], function() {
			this.scope.currentLocalModule = localModule;
			this.walkStatements(statement.body.body);
		}.bind(this));
		return true;
	}
});

