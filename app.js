//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB");

server = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const blogSchema = new mongoose.Schema({
	title: String,
	content: String,
});

const BlogPost = mongoose.model("blogPost", blogSchema);

const homeStartingContent =
	"Lacus vel facilisis volutpat est velitLacus vel facilisis volutpat est velit egempctus arcu bib	Htesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam s turpis massa tincidunt dui.endum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesegempctus arcu bib	Htesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam s turpis massa tincidunt dui.endum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentes";
const aboutContent =
	"Htesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam s turpis massa tincidunt dui.";
const contactContent =
	"Scelerisque eleifend done neque viverra justo nec ultrices ut consequat semper viverra nam libero.vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus";

app.get("/", (req, res) => {
	BlogPost.find({}, (err, content) => {
		res.render("home", {
			startingContent: homeStartingContent,
			posts: content,
		});
	});
});

app.post("/", (req, res) => {});

app.get("/about", (req, res) => {
	res.render("about", {
		aboutContent: aboutContent,
	});
});

app.get("/contact", (req, res) => {
	res.render("contact", {
		contactContent: contactContent,
	});
});

app.get("/compose", (req, res) => {
	res.render("compose");
});

app.post("/compose", (req, res) => {
	const content = new BlogPost({
		title: req.body.postTitle,
		content: req.body.message,
	});
	content.save((err) => {
		if (!err) {
			res.redirect("/");
		}
	});
});

app.get("/post/:postid", (req, res) => {
	const requestPostid = req.params.postid;
	BlogPost.findOne({ _id: requestPostid }, (err, content) => {
		if (!err) {
			res.render("post", {
				postTitle: content.title,
				writeUp: content.content,
			});
		} else {
			console.log(err);
		}
	});
	// .lowerCase([string=''])_.join(array, [separator=','])
});

app.listen(server, function () {
	console.log("Server started on port 3000");
});
