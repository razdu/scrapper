const mongoose = require("mongoose");

const siteSchema = mongoose.Schema(
	{
		siteName: {
			type: String,
			required: true,
		},
		siteURL: {
			type: String,
			required: true,
		},
		siteSelector: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Site", siteSchema);
