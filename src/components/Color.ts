export type ColorScheme = 'auto' | 'dark' | 'light'

export interface ColorState {
  currentScheme: ColorScheme

  rotateColorScheme(): void
  setCurrentScheme(value: ColorScheme, save?: boolean): void
}

export default function Color(): ColorState {
  const state: ColorState = {
    currentScheme: 'auto',

    setCurrentScheme(value, save) {
      this.currentScheme = value
      document.body.classList.remove('color-auto', 'color-dark', 'color-light')
      document.body.classList.add(`color-${value}`)

      if (save) localStorage?.setItem('prefer-color-scheme', value)
    },

    rotateColorScheme() {
      if (this.currentScheme === 'auto') this.setCurrentScheme('light', true)
      else if (this.currentScheme === 'light') this.setCurrentScheme('dark', true)
      else this.setCurrentScheme('auto', true)
    },
  }

  function loadColorScheme() {
    const prev = localStorage?.getItem('prefer-color-scheme')
    if (prev) state.setCurrentScheme(prev as ColorScheme)
  }

  loadColorScheme()

  return state
}
