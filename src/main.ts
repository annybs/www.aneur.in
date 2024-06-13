import './style.scss'
import Alpine from 'alpinejs'
import Skills from './components/Skills'

function main() {
  (window as unknown as { Alpine: typeof Alpine }).Alpine = Alpine
  Alpine.data('skills', Skills)
  Alpine.start()
}

main()
