// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber
    };

    getOfficeNumber () {
        return this.officeNumber;
    }

    getRole() {
        return "Manager"
    }
}

//TESTING CODE BELOW
// const manager = new Manager("Harry", 4, "Harry@Sam", "040488733")
// manager.getAllInfo();

module.exports = Manager;