// type AddFn = (a: number, b: number) => number
interface AddFn {
    (a: number, b: number): number
}

let add: AddFn

interface Named {
    readonly name?: string
    outputName?: string
}

interface Greetable extends Named {
    greet(phrase: string): void
}

class Person implements Greetable {
    name?: string
    age = 26
    constructor(n?: string) {
        if (n){
            this.name = n
        }
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}

let user1: Greetable

user1 = new Person()

user1.greet('Hello')