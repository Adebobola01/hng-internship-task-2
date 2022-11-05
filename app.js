const express = require("express");

const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());


//function to calculate numbers
const getResult = (operation, num1, num2) => {
    if (operation === "add" || operation === "addition" || operation === "plus") return Number(num1) + Number(num2);
    else if (operation === "subtract" || operation === "subtraction" || operation === "minus") return Number(num1) - Number(num2);
    else if (operation === "multiply" || operation === "multiplication" || operation === "times") return Number(num1) * Number(num2);
    else if (operation === "divide" || operation === "division") return Number(num1) / Number(num2);
}


//CORS handling
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, PUT, DELETE, PATCH"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.post("/", (req, res, next) => {
    //extract request body
    const operation = req.body.operation_type.toLowerCase();
    const x = req.body.x;
    const y = req.body.y;

    let operationResult;
    let operand;
    

    //checking if operation is a sentence or not
    const check = operation.split(" ");
    if (check.length === 1) {
        operationResult = getResult(operation, x, y);
        operand = operation
    } else {
        for (let i = 0; i < check.length; i++){
            if (check[i] === 'add' || check[i] === 'addition' || check[i] === 'subtract' || check[i] === 'subtraction' || check[i] === 'minus' || check[i] === 'multiply' || check[i] === 'multiplication' || check[i] === 'divide' || check[i] === 'division' || check[i] === "plus" || check[i] === "times") {
                operand = check[i];
                operationResult = getResult(check[i], x, y)
            };
        }
    }

    //sending response
    res.status(200).json({
        slackUsername: "adebobola",
        result: operationResult,
        operation_type: operand,
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 2000")
});

    
