import { Skill } from '../types'
import request, { ErrorResponse } from '@annybs/request-js'

export default function Skills() {
  interface State {
    currentTag: string | null
    skills: Skill[]
    tags: string[]
    visibleSkills: Skill[]

    init(): void
    setCurrentTag(e: MouseEvent): void
    tagClass(value: string): string
  }

  function readCurrentTag() {
    const usp = new URLSearchParams(window.location.search)
    return usp.get('tag')
  }

  function updateVisibleSkills(this: State) {
    const tag = this.currentTag
    if (tag) this.visibleSkills = this.skills.filter(skill => skill.tags.includes(tag))
    else this.visibleSkills = this.skills
  }

  const state: State = {
    currentTag: null,
    skills: [],
    visibleSkills: [],

    get tags() {
      return this.skills
        .reduce((tags, skill) => {
          for (const tag of skill.tags) {
            if (tags.indexOf(tag) === -1) tags.push(tag)
          }
          return tags
        }, <string[]>[])
        .sort()
    },

    async init() {
      const tag = readCurrentTag()
      this.currentTag = tag

      try {
        const res = await request.get(`//${document.location.host}/skills.json`)
        this.skills = (res.json as Skill[]).sort((a, b) => a.name.localeCompare(b.name))
        updateVisibleSkills.apply(this)
      } catch (err) {
        const e = err as ErrorResponse
        console.error(e.name, e.message)
      }
    },

    setCurrentTag(e) {
      const tag = (e.target as HTMLAnchorElement)?.dataset?.tag
      if (!tag) return

      e.preventDefault()

      if (tag === this.currentTag) {
        window.history.pushState({ tag }, '', `${window.location.pathname}#skills`)
        this.currentTag = null
      } else {
        window.history.pushState({ tag }, '', `${window.location.pathname}?tag=${tag}#skills`)
        this.currentTag = tag
      }

      updateVisibleSkills.apply(this)
      return tag
    },

    tagClass(value: string) {
      if (value === this.currentTag) return 'tag active'
      return 'tag'
    },
  }

  return state
}
