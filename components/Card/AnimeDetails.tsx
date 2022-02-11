import { useAnimeCard } from "./context/AnimeCardContext";

function AnimeDetails() {
  const { anime } = useAnimeCard();
  return (
    <>
      <p>Rank #{anime.attributes.ratingRank}</p>
      <p>Rate R:{anime.attributes.ageRatingGuide}</p>
      <p>Aired on: {anime.attributes.startDate}</p>
      <p>Ongoin or Ended on: {anime.attributes.endDate}</p>
      <p>Type: {anime.attributes.showType} </p>
    </>
  );
}
export { AnimeDetails };
