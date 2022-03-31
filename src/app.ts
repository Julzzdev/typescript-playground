const userName = 'Julzz'
// userName = 'Dingo D. Pug'

let age = 20
age = 26
/* * Scope 
*/
// function add(a: number, b: number) {
//     let result
//     result = a + b
//     return result
// }

// * Default parameters must always go the right most
// const add = (a: number, b: number = 1) => a + b

// const printOutput = (output: string | number) => console.log(output)

// const button = document.querySelector('button')

// button?.addEventListener('click', event => console.log(event))
// printOutput(add(5))

const hobbies = ['Music', 'Videogames']
const activeHobbies = ['Piano']

activeHobbies.push(...hobbies)
console.log(activeHobbies)

const person = {
    name: 'Julzz',
    age: 26
}

const copiedPerson = { ...person }

// * Spread operator for parameters

const add = (...params: number[]) => {
    return params.reduce((currentResult, currentValue) => {
        return currentResult + currentValue
    }, 0)
}

const addedNumbers = add(5, 10, 15, 3.9)
console.log(addedNumbers)

const [hobby1, hobby2, ...remainingHobbies] = hobbies

console.log(hobbies, hobby1, hobby2)