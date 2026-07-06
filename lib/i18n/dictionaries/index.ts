import de from './de'
import en from './en'
import type { Locale } from '../config'
import type { Dictionary } from './de'

export const dictionaries: Record<Locale, Dictionary> = { de, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
