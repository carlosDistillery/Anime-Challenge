import { Anime } from '../types/anime';

export function filterBySelectOption({ animes, filter }: { animes: Anime[], filter: 'all' | 'stars' | 'likes', }) {
  console.log('animes', animes)
  console.log('filter', filter)

  return animes
}


