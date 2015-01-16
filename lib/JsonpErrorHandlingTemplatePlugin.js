/**
 * @author "Evgeny Reznichenko" <kusakyky@gmail.com>
 */


module.exports = JsonpErrorHandlingTemplatePlugin;

function JsonpErrorHandlingTemplatePlugin() {
}

JsonpErrorHandlingTemplatePlugin.prototype.constructor = JsonpErrorHandlingTemplatePlugin;

JsonpErrorHandlingTemplatePlugin.prototype.apply = function (mainTemplate) {

    mainTemplate.plugin("local-vars", function(source, chunk, hash) {
        if(chunk.chunks.length > 0) {
            return this.asString([
                source,
                "// object to store chunk load error",
                "var chunkLoadErrors = {};",
                ""
            ]);
        }
        return source;
    });
    mainTemplate.plugin("require-ensure", function(_, chunk, hash) {
        var filename = this.outputOptions.filename || "bundle.js";
        var chunkFilename = this.outputOptions.chunkFilename || "[id]." + filename;
        var chunkMaps = chunk.getChunkMaps();
        return this.asString([
            "// \"0\" is the signal for \"already loaded\"",
            "// \"-1\" is the signal for \"chunk load error\"",
            "if(installedChunks[chunkId] === 0 || installedChunks[chunkId] === -1)",
            this.indent("return callback.call(null, chunkLoadErrors[chunkId], " + this.requireFn + ");"),
            "",
            "// an array means \"currently loading\".",
            "if(installedChunks[chunkId] !== undefined) {",
            this.indent("installedChunks[chunkId].push(callback);"),
            "} else {",
            this.indent([
                "// start chunk loading",
                "installedChunks[chunkId] = [callback];",
                "var head = document.getElementsByTagName('head')[0];",
                "var script = document.createElement('script');",
                "script.type = 'text/javascript';",
                "script.charset = 'utf-8';",
                "script.async = true;",
                "script.src = " + this.requireFn + ".p + " +
                this.applyPluginsWaterfall("asset-path", JSON.stringify(chunkFilename), {
                    hash: "\" + " + this.renderCurrentHashCode(hash) + " + \"",
                    hashWithLength: function(length) {
                        return "\" + " + this.renderCurrentHashCode(hash, length) + " + \"";
                    }.bind(this),
                    chunk: {
                        id: "\" + chunkId + \"",
                        hash: "\" + " + JSON.stringify(chunkMaps.hash) + "[chunkId] + \"",
                        hashWithLength: function(length) {
                            var shortChunkHashMap = {};
                            Object.keys(chunkMaps.hash).forEach(function(chunkId) {
                                if(typeof chunkMaps.hash[chunkId] === "string")
                                    shortChunkHashMap[chunkId] = chunkMaps.hash[chunkId].substr(0, length);
                            });
                            return "\" + " + JSON.stringify(shortChunkHashMap) + "[chunkId] + \"";
                        },
                        name: "\" + (" + JSON.stringify(chunkMaps.name) + "[chunkId]||chunkId) + \""
                    }
                }) + ";",
                "setupScriptLoadErrorHandler(script, chunkId);",
                "head.appendChild(script);"
            ]),
            "}"
        ]);
    });
    mainTemplate.plugin("bootstrap", function(source, chunk, hash) {
        return source;
    });
};
