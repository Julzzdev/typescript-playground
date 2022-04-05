// A decorator is defined as a function
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function <T extends { new (...args: any[]): { name: string } }>(original: T) {
    return class extends original {
      constructor(...args: any[]) {
        super()
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

// A constructor is executed when the class is defined NOT executed
@Logger('Logging - Person')
class Person {
  name = 'Julzz'

  constructor() {
    console.log('Creating person object...')
  }
}

const p1 = new Person()
console.log(p1)
@Logger('Logging')
@WithTemplate('<h1> A template rendered by decorator </h1>', 'app')
class HTMLTemplate {
  name = 'Dingo'
}

const html = new HTMLTemplate()

// Property Decorators
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property Decorator!')
  console.log(target, propertyName)
}

// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Method Decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator')
  console.log(target)
  console.log(name)
  console.log(descriptor)
}

// Parameter Decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator')
  console.log(target)
  console.log(name)
  console.log(position)
}

class Product {
  @Log
  title: string
  private _price: number

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('A price cannot be negative!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    },
  }
  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}
const p = new Printer()
const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)
// Decorator Validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // required, positive, ...
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required'],
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive'],
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true
  }
  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          return (isValid = isValid && !!obj[prop])
        case 'positive':
          return (isValid = isValid && obj[prop] > 0)
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const course = new Course(title, price)

  if (!validate(course)) {
    throw new Error('Input not valid')
  }

  console.log(course)
})
