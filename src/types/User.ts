export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    city: string
    street: string
    suite: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
