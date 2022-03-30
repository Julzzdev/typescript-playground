// * Object types describe the type of the object attributes

// const person: {
//     name: string,
//     age: number,
//     hobbies: string[],
//     role: [number, string]
// } = {
//     name: 'Julio',
//     age: 26,
//     hobbies: ['Music', 'Games'],
//     role: [2, 'author']
// }

enum Role { ADMIN, READ_ONLY, AUTHOR }

const person = {
    name: 'Julio',
    age: 26,
    hobbies: ['Music', 'Games'],
    role: Role.ADMIN
}

// person.role.push('admin') Will not work properly
// person.role[1] = 10
// person.role = [1, 'admin']


let favoriteActivities: string[]

for (const hobby of person.hobbies) {
    console.log(hobby)
}

console.log(person.role)