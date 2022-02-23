const express = require("express"),
	mongoose = require("mongoose"),
	app = express(),
	port = 8000,
	siteRouter = require("./routes/siteRouter");

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//#region axios
// app.get("/siteParser", (req, res) => {
// 	axios("https://www.amazon.com").then((html) => {
// 		html = parse(html.data);
// 		res.send(html.querySelector("title").text);
// 	});
// });
// app.get("/siteParser", (req, res) => {
// 	axios("https://www.ebay.com").then((html) => {
// 		html = parse(html.data);
// 		html.querySelector("title").text;
// 	});
// });
//#endregion
app.use("/sites", siteRouter);

mongoose
	.connect("mongodb://127.0.0.1:27017/scrapper")
	.then(() => {
		app.listen(port, () => {
			console.info(`server listening on http://localhost:${port}`);
		});
	})
	.catch((err) => console.error(err));
