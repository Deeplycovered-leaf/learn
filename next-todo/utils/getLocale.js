import 'server-only'
 
const dictionaries = {
  en: () => import('@/locale/en.json').then((module) => module.default),
  nl: () => import('@/locale/nl.json').then((module) => module.default),
}
 
export const getLocale = async (locale) => dictionaries[locale]()
