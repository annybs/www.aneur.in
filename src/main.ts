import './style.scss'
import Alpine from 'alpinejs'
import Analytics from './components/Analytics'
import Contact from './components/Contact'
import Skills from './components/Skills'

function main() {
  (window as unknown as { Alpine: typeof Alpine }).Alpine = Alpine
  Alpine.data('analytics', Analytics(import.meta.env.VITE_ANALYTICS_WEBSITE_ID || ''))
  Alpine.data('contact', Contact)
  Alpine.data('skills', Skills)
  Alpine.start()
}

main()
