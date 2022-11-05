const express = require("express");

const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());


//function to calculate numbers
const getResult = (operation, num1, num2) => {
    console.log(operation)
    if (operation === "add" || operation === "Add" || operation === "Addition" || operation === "addition") return Number(num1) + Number(num2);
    else if (operation === "subtract" || operation === "Subtraction" || operation === "Subtract" || operation === "subtraction") return Number(num1) - Number(num2);
    else if (operation === "multiply" || operation === "Multiply" || operation === "multiplication" || operation === "Multiplication") return Number(num1) * Number(num2);
    else if (operation === "divide" || operation === "Divide" || operation === "divition" || operation === "Divition") return Number(num1) / Number(num2);
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
    const operation = req.body.operation_type;
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
        console.log(check)
        for (let i = 0; i < check.length; i++){
            if (check[i] === 'add' || check[i] === 'Add' || check[i] === 'Addition' || check[i] === 'addition' || check[i] === 'subtract' || check[i] === 'Subtraction' || check[i] === 'Subtract' || check[i] === 'subtraction' || check[i] === 'multiply' || check[i] === 'Multiply' || check[i] === 'multiplication' || check[i] === 'Multiplication' || check[i] === 'divide' || check[i] === 'Divide' || check[i] === 'divition' || check[i] === 'Divition') {
                operand = check[i];
                operationResult = getResult(check[i], x, y)
            };
        }
    }

    //sending response
    res.status(200).json({
        slackUsername: "adebobola",
        result: operationResult,
        operation_type: operand.toLowerCase(),
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 2000")
});

    
