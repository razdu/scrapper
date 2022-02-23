const mongoose = require("mongoose");
const Site = require("../models/site");

const getAllSites = () => {
	return new Promise((resolve, reject) => {
		Site.find({})
			.then((sites) => resolve(sites))
			.catch((err) => reject(err));
	});
};
const insertOneSite = (siteData) => {
	return new Promise((resolve, reject) => {
		const site = new Site(siteData)
			.save()
			.then((site) => resolve(site))
			.catch((err) => reject(err));
	});
};
const getOneSite = (id) => {
	return new Promise((resolve, reject) => {
		Site.findById(id)
			.lean()
			.then((site) => resolve(site))
			.catch((err) => reject(err));
	});
};
const updateSite = (id, siteData) => {
	return new Promise((resolve, reject) => {
		Site.findByIdAndUpdate(id, siteData)
			.then((site) => resolve(site))
			.catch((err) => reject(err));
	});
};
const deleteSite = (id) => {
	return new Promise((resolve, reject) => {
		Site.findByIdAndDelete(id)
			.then((site) => resolve(site))
			.catch((err) => reject(err));
	});
};
module.exports = { getAllSites, insertOneSite, getOneSite, updateSite, deleteSite };
