export interface ContactState {
  email: string
}

export default function Contact(): ContactState {
  const email = 'ni.ruena@a'.split('').reverse().join('')

  return {
    email,
  }
}
