// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github
    };

    getGithub() {
        console.log(this.github)
        return this.github
    };

    getRole() {
        return "Engineer"
    }
}

//TESTING CODE BELOW
// const engineer = new Engineer("bill", 2, "bill@bill", "@billy")
// engineer.getAllInfo();
// engineer.getGitHub();

module.exports = Engineer;