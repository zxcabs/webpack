/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var HarmonyImportDependency = require("./HarmonyImportDependency");
var HarmonyImportExportDependency = require("./HarmonyImportExportDependency");
var HarmonyExportDependency = require("./HarmonyExportDependency");
var HarmonyModuleDependency = require("./HarmonyModuleDependency");
var HarmonyImportModuleDependency = require("./HarmonyImportModuleDependency");
var HarmonyExportModuleDependency = require("./HarmonyExportModuleDependency");

var NullFactory = require("../NullFactory");

var HarmonyImportDependencyParserPlugin = require("./HarmonyImportDependencyParserPlugin");
var HarmonyExportDependencyParserPlugin = require("./HarmonyExportDependencyParserPlugin");
var HarmonyModuleDependencyParserPlugin = require("./HarmonyModuleDependencyParserPlugin");

var BasicEvaluatedExpression = require("../BasicEvaluatedExpression");

function HarmonyModulesPlugin() {
}
module.exports = HarmonyModulesPlugin;

HarmonyModulesPlugin.prototype.apply = function(compiler) {
	compiler.plugin("compilation", function(compilation, params) {
		var normalModuleFactory = params.normalModuleFactory;

		compilation.dependencyFactories.set(HarmonyImportDependency, normalModuleFactory);
		compilation.dependencyTemplates.set(HarmonyImportDependency, new HarmonyImportDependency.Template());

		compilation.dependencyFactories.set(HarmonyImportExportDependency, normalModuleFactory);
		compilation.dependencyTemplates.set(HarmonyImportExportDependency, new HarmonyImportExportDependency.Template());

		compilation.dependencyFactories.set(HarmonyExportDependency, new NullFactory());
		compilation.dependencyTemplates.set(HarmonyExportDependency, new HarmonyExportDependency.Template());

		compilation.dependencyFactories.set(HarmonyModuleDependency, new NullFactory());
		compilation.dependencyTemplates.set(HarmonyModuleDependency, new HarmonyModuleDependency.Template());

		compilation.dependencyFactories.set(HarmonyImportModuleDependency, new NullFactory());
		compilation.dependencyTemplates.set(HarmonyImportModuleDependency, new HarmonyImportModuleDependency.Template());

		compilation.dependencyFactories.set(HarmonyExportModuleDependency, new NullFactory());
		compilation.dependencyTemplates.set(HarmonyExportModuleDependency, new HarmonyExportModuleDependency.Template());
	});
	compiler.parser.apply(
		new HarmonyImportDependencyParserPlugin(),
		new HarmonyExportDependencyParserPlugin(),
		new HarmonyModuleDependencyParserPlugin()
	);
};