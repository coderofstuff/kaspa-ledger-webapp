const webpack = require('webpack'); 
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, {
      "fs": false
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new NodePolyfillPlugin({
         excludeAliases: ['console'],
       })
   ]) 
   return config; }