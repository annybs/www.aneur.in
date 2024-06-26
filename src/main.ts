import './style.scss'
import Alpine from 'alpinejs'
import Analytics from './components/Analytics'
import Color from './components/Color'
import Contact from './components/Contact'
import Font from './components/Font'
import Skills from './components/Skills'

function main() {
  (window as unknown as { Alpine: typeof Alpine }).Alpine = Alpine
  Alpine.data('analytics', Analytics(import.meta.env.VITE_ANALYTICS_WEBSITE_ID || ''))
  Alpine.data('color', Color)
  Alpine.data('contact', Contact)
  Alpine.data('font', Font)
  Alpine.data('skills', Skills)
  Alpine.start()
}

main()
