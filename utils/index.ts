import { Anime } from '../types/anime';

// !IMPORTANT
/**
 * The next filter function into infinite query is no the best option to solve the problem in the real
 * life. I'm using it only for the purpose of the challenge ._.)/ 
 * 
 */
export function filterBySelectOption({ animes, filter }: { animes: any, filter: "all" | 'stars' | 'likes', }) {


  if (!JSON.parse(localStorage.getItem(filter))) {
    return animes
  }

  const dataFromCache: { title: string }[] = JSON.parse(localStorage.getItem(filter))
  const arrays = animes.map((obj: any) => obj.data)
  const arraysMerged = [].concat.apply([], arrays)


  const dataFiltered = arraysMerged.filter((anime: Anime) => dataFromCache.find(animeFromCache => {
    return anime.attributes.slug == animeFromCache.title
  }))

  const dataFormatted = [{ data: dataFiltered }]
  return dataFormatted
}



export function readCacheData({ itemKey, valueToFind }: { itemKey: string, valueToFind: string }) {
  if (typeof window !== "undefined" && localStorage.getItem(itemKey)) {

    const isSelected = JSON.parse(localStorage.getItem(itemKey)).filter(
      (cacheValue: { title: string }) =>
        cacheValue.title === valueToFind
    );

    return !!isSelected.length;
  } else {
    return false;
  }
}