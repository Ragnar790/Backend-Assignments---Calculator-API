const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.get("", (req, res) => {
	res.send("Hello world!");
});

//CHEKCING IF THE NUMBERS ARE CALCULABLE
const checkFlow = (num1, num2) => {
	if (num1 < -1000000 || num2 < -1000000 || num1 - num2 < -1000000) {
		return "Underflow";
	} else if (num1 > 1000000 || num2 > 1000000 || num1 + num2 > 1000000) {
		return "Overflow";
	} else if (isNaN(num1) || isNaN(num2)) {
		return "Invalid data types";
	} else {
		return true;
	}
};

//ADDITION
app.post("/add", (req, res) => {
	// console.log(req.body.num1);
	// console.log(req.body.num2);
	if (checkFlow(req.body.num1, req.body.num2) === true) {
		res.send({
			status: "success",
			message: "the sum of given two numbers",
			sum: req.body.num1 + req.body.num2,
		});
	} else {
		res.send({
			status: "error",
			message: checkFlow(req.body.num1, req.body.num2),
		});
	}
});

//SUBTRACTION
app.post("/sub", (req, res) => {
	// console.log(req.body.num1);
	// console.log(req.body.num2);
	if (checkFlow(req.body.num1, req.body.num2) === true) {
		res.send({
			status: "success",
			message: "the difference of given two numbers",
			difference: req.body.num1 - req.body.num2,
		});
	} else {
		res.send({
			status: "error",
			message: checkFlow(req.body.num1, req.body.num2),
		});
	}
});

//MULTIPLY
app.post("/multiply", (req, res) => {
	// console.log(req.body.num1);
	// console.log(req.body.num2);
	if (checkFlow(req.body.num1, req.body.num2) === true) {
		res.send({
			status: "success",
			message: "The product of given numbers",
			result: req.body.num1 * req.body.num2,
		});
	} else {
		res.send({
			status: "error",
			message: checkFlow(req.body.num1, req.body.num2),
		});
	}
});

//DIVIDE
app.post("/divide", (req, res) => {
	// console.log(req.body.num1);
	// console.log(req.body.num2);
	if (checkFlow(req.body.num1, req.body.num2) === true && req.body.num2 != 0) {
		res.send({
			status: "success",
			message: "The division of given numbers",
			result: req.body.num1 / req.body.num2,
		});
	} else if (req.body.num2 === 0) {
		res.send({
			status: "error",
			message: "Cannot divide by zero",
		});
	} else {
		res.send({
			status: "error",
			message: checkFlow(req.body.num1, req.body.num2),
		});
	}
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
