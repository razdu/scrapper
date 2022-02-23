const mongoose = require("mongoose"),
	siteRoutes = require("express").Router(),
	{ getAllSites, insertOneSite, getOneSite, updateSite, deleteSite } = require("../controllers/siteController");
const { parse } = require("node-html-parser");
const axios = require("axios");

siteRoutes.get("/", (req, res) => {
	getAllSites()
		.then((sites) => res.json(sites))
		.catch((err) => res.json(err));
});
siteRoutes.post("/", (req, res) => {
	insertOneSite(req.body)
		.then((site) => res.json(site))
		.catch((err) => res.json(err));
});
siteRoutes.get("/:id", (req, res) => {
	getOneSite(req.params.id)
		.then((site) => parseData(site))
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
});
siteRoutes.put("/:id", (req, res) => {
	updateSite(req.params.id, req.body)
		.then((site) => res.json(site))
		.catch((err) => res.json(err));
});
siteRoutes.delete("/:id", (req, res) => {
	deleteSite(req.params.id)
		.then((site) => res.json(site))
		.catch((err) => res.json(err));
});
module.exports = siteRoutes;

function parseData(site) {
	return new Promise((resolve, reject) =>
		axios(site.siteURL).then((html) => {
			html = parse(html.data);
			site.siteData = html.querySelector(site.siteSelector).text;
			resolve(site);
		})
	);
}
