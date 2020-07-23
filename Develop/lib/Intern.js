// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school
    };

    getSchool() {
        console.log(this.school)
        return this.school
    };

    getRole() {
        return "Intern"
    }
}

//TESTING CODE BELOW
// const intern = new Intern("sam", 3, "sam@bill", "UCLA")
// intern.getAllInfo();
// intern.getSchool();

module.exports = Intern;