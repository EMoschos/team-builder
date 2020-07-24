const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

const empQuestions = [
    "What is the employee's Full Name?",
    "What is the employee's ID Number?",
    "What is the employee's Email Address?"
];

// const mngrQuestions = [
//    "What is the interns phone number?"
// ];

//const internQuestions = [
//    "What School/College does the intern attend?"
// ];

// const engQuestions = [
//    "What is the engineer's GitHub username?"
//];

function managPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: empQuestions[0]
        },
        {
            type: "input",
            name: "id",
            message: empQuestions[1]
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2]
        },
        {
            type: "input",
            name: "office",
            message: "What is your Manager's phone number?"
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
            message: empQuestions[1]
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2]
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
            message: empQuestions[1]
        },
        {
            type: "input",
            name: "email",
            message: empQuestions[2]
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?"
        },
    ]).then(function (data) {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        employees.push(engineer);
        console.log(employees);
    empType();
});
};

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

function teamInit() {
    console.log("Welcome to the Node CLI team builder App.  Answer the prompts and when you're done select finish to see the end result")
    managPrompt();
};

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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
