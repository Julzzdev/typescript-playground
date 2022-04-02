// * In OOP the idea is to be able to work with (real-life) entities in your code
// * An object is the thing you work with in code
// * A class is a blueprint for objects

class Department {
    // private name: string
    private employees: string[] = []

    constructor(private readonly id: string, public name: string) {
        // this.name = n
    }

    describe(this: Department) {
        console.log(`Department (${this.id}) ${this.name}`)
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployees() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT')
        this.admins = admins
    }
}

const accounting = new Department('DID001','Accounting')
accounting.addEmployee('Julzz')
accounting.addEmployee('Dingo')

const it = new ITDepartment('ITD002', ['Tachibana'])

// accounting.employees[2] = 'Monji' // * Trick we must try to avoid with the private property definition

accounting.printEmployees()

accounting.describe()
console.log(it.admins)

// const accountCopy = { name: 'HR', describe: accounting.describe }
// accountCopy.describe()