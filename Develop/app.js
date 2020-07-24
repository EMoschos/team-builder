const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const empQuestions = [
    "What is the employee's Full Name?",
    "What is the employee's ID Number?",
    "What is the employee's Email Address?"
];

// VALIDATION FUNCTIONS:

const validName = async (input) => {
    if (!/[1-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi.test(input)) {
        return true;
    } else {
        console.log("\n" + "incorrect input, numbers and characters can't be included in the name")
    }
}

const validId = async (input) => {
    if (input > 0) {
        return true;
    } else {
        console.log("\n" + "incorrect input, needs to be a number greater than 0")
    }
}

const validOffice = async (input) => {
    if (input.length === 8 && input > 9999999) {
        return true;
    } else {
        console.log("\n" + "incorrect input, needs to be a 8 numbers long");
    }
}

const validEmail = async (input) => {
    if (input.includes("@") && input.includes(".com")) {
        return true;
    } else {
        console.log("\n" + "incorrect input, email needs to contain the '@' symbol & '.com'");
    }
}

const validGithub = async (input) => {
    if (!input.includes(" ")) {
        return true;
    } else {
        console.log("\n" + "incorrect input, GitHub username cannot have spaces");
    }
}

// INQUIRER PROMPT FUNCTIONS

function managPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: empQuestions[0],
            validate: validName  
        },
        {
            type: "input",
            name: "id",
            message: empQuestions[1],
            validate: validId
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2],
            validate: validEmail
        },
        {
            type: "input",
            name: "office",
            message: "What is the Manager's office number?",
            validate: validOffice
        },
    ]).then(function (data) {
        const manager = new Manager(data.name, data.id, data.email, data.office);
        console.log(data);
        employees.push(manager);
        console.log(employees);
        empType();
    });
};

function internPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: empQuestions[0]
        },
        {
            type: "input",
            name: "id",
            message: empQuestions[1],
            validate: validId
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2],
            validate: validEmail
        },
        {
            type: "input",
            name: "school",
            message: "What School/College does the intern attend?"
        },
    ]).then(function (data) {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        employees.push(intern);
        console.log(employees);
    empType();
});
};

function engPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: empQuestions[0]
        },
        {
            type: "input",
            name: "id",
            message: empQuestions[1],
            validate: validId
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2],
            validate: validEmail
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            validate: validGithub
        },
    ]).then(function (data) {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        employees.push(engineer);
        console.log(employees);
    empType();
});
};

// FUNCTION TO CONTINUE THE LOOP AND ALSO FINISH THE INPUT OF EMPLOYEES

function empType() {
    return inquirer.prompt([
        {
            type: "list",
            name: "empType",
            message: "Would you like to create another employee? (select type)",
            choices: [
                "Intern",
                "Engineer",
                "Finish",
                new inquirer.Separator()
            ]
        },

    ]).then(function (data) {
        if (data.empType === "Intern") {
            internPrompt();
        } else if (data.empType === "Engineer") {
            engPrompt();
        } else { //Finish
            renderTeam();
    return;
}
    })
};

//FUNCTION TO INTIALISE AND START THE CLI APP

function teamInit() {
    console.log("Welcome to the Node CLI team builder App.  Answer the prompts and when you're done select finish to see the end result")
    managPrompt();
};

// FUNCTION TO RENDER THE INPUTTED TEAM TO A HTML FILE

async function renderTeam () {
    const htmlRender = await render(employees);
    fs.writeFile(outputPath, htmlRender, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("team.html Created with user input")
    });
};

teamInit();
