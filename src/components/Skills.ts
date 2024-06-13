import { Skill } from '../types'
import request, { ErrorResponse } from '@annybs/request-js'

export default function Skills() {
  interface State {
    skills: Skill[]

    init(): void
  }

  const state: State = {
    skills: [],

    async init() {
      try {
        const res = await request.get(`//${document.location.host}/skills.json`).send()
        this.skills = res.json as Skill[]
      } catch (err) {
        const e = err as ErrorResponse
        console.error(e.name, e.message)
      }
    },
  }

  return state
}
