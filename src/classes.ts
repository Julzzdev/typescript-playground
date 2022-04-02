// * In OOP the idea is to be able to work with (real-life) entities in your code
// * An object is the thing you work with in code
// * A class is a blueprint for objects

abstract class Department {
    // private name: string
    protected employees: string[] = []

    constructor(protected readonly id: string, public name: string) {
        // this.name = n
    }

    static createEmployee(name: string) {
        return { name }
    } 

    abstract describe(this: Department): void 

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

    describe() {
        console.log(`IT department ${this.id}`)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string
    private static instance: AccountingDepartment

    get mostRecentReport() {
        if( this.lastReport) {
            return this.lastReport
        }
        throw new Error('No last report found')
    }

    set mostRecentReport(value: string) {
        if(!value) {
            throw new Error('Please pass in a valid value!')
        }
        this.addReport(value)
    }

    private constructor (id: string, private reports: string[]) {
        super(id, 'Accounting')
        this.lastReport = reports[0]
    }

    static getInstance() {
        if(AccountingDepartment.instance) {
            return this.instance
        }
        this.instance = new AccountingDepartment('d2', [])
        return this.instance
    }

    addEmployee(name: string) {
        if (name === 'Dingo') {
            return
        }
        this.employees.push(name)
    }

    describe(): void {
        console.log(`Accounting department - ${this.id}`)
    }

    addReport(text: string){
        this.reports.push(text)
    }

    getReports(){
        console.log(this.reports)
    }
}

/* const accounting = new Department('DID001','Accounting')
accounting.addEmployee('Julzz')
accounting.addEmployee('Dingo')
 */

const employee1 = Department.createEmployee('Hoshinomiya')
console.log(employee1)

const accounting = AccountingDepartment.getInstance()
const it = new ITDepartment('ITD002', ['Tachibana'])

// accounting.employees[2] = 'Monji' // * Trick we must try to avoid with the private property definition

accounting.printEmployees()

accounting.describe()
console.log(it.admins)

// const accountCopy = { name: 'HR', describe: accounting.describe }
// accountCopy.describe()