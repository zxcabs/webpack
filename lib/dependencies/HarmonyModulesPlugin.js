/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var HarmonyImportDependency = require("./HarmonyImportDependency");
var HarmonyExportDependency = require("./HarmonyExportDependency");

var NullFactory = require("../NullFactory");

var HarmonyImportDependencyParserPlugin = require("./HarmonyImportDependencyParserPlugin");
var HarmonyExportDependencyParserPlugin = require("./HarmonyExportDependencyParserPlugin");

var BasicEvaluatedExpression = require("../BasicEvaluatedExpression");

function HarmonyModulesPlugin() {
}
module.exports = HarmonyModulesPlugin;

HarmonyModulesPlugin.prototype.apply = function(compiler) {
	compiler.plugin("compilation", function(compilation, params) {
		var normalModuleFactory = params.normalModuleFactory;

		compilation.dependencyFactories.set(HarmonyImportDependency, normalModuleFactory);
		compilation.dependencyTemplates.set(HarmonyImportDependency, new HarmonyImportDependency.Template());

		compilation.dependencyFactories.set(HarmonyExportDependency, new NullFactory());
		compilation.dependencyTemplates.set(HarmonyExportDependency, new HarmonyExportDependency.Template());
	});
	compiler.parser.apply(
		new HarmonyImportDependencyParserPlugin(),
		new HarmonyExportDependencyParserPlugin()
	);
};