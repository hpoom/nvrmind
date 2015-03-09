var cfgSites = require('../config/sites');

var cms = module.exports = {};

// Fetch a list of sites that exist in our config
cms.getSites = function() {
	return Object.keys( cfgSites );
}

// Fetch the config for a single site
cms.getSite = function(site) {
	return cfgSites[site];
}
