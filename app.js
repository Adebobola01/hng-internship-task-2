const express = require("express");

const app = express();

app.use(express.json());

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

const getResult = (operation, num1, num2) => {
    if (operation = "add" || "Add" || "Addition" || "addition") return Number(num1) + Number(num2);
    else if (operation = "subtract" || "Subtraction" || "Subtract" || "subtraction") return Number(num1) - Number(num2);
    else if (operation = "multiply" || "Multiply" || "multiplication" || "Multiplication") return Number(num1) * Number(num2);
    else if (operation = "divide" || "Divide" || "divition" || "Divition") return Number(num1) / Number(num2);
}

app.post("/", (req, res, next) => {
    console.log("here")
    const operation = req.body.operation_type;
    const x = req.body.x;
    const y = req.body.y;

    let operationResult;
    let operand;
    
    const check = operation.split(" ");
    if (check.length === 1) {
       operationResult = getResult(operation, x, y);
    } else {
        for (let i = 0; i < check.length; i++){
            if (check[i] === 'add' || 'Add' || 'Addition' || 'addition' || 'subtract' || 'Subtraction' || 'Subtract' || 'subtraction' || 'multiply' || 'Multiply' || 'multiplication' || 'Multiplication' || 'divide' || 'Divide' || 'divition' || 'Divition') {
                operand = check[i];
                operationResult = getResult(check[i], x, y)
            };
            return
        }
    }

    res.status(200).json({
        slackUsername: "adebobola",
        operation_type: operand,
        result: operationResult
    })
});

app.listen(process.env.PORT || 2000, () => {
    console.log("listening on port 2000")
});

    
