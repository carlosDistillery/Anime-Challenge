import { useAnimeCard } from "./AnimeCardContext";

function AnimeStars() {
  //** TODO pasarle al store la respuesta de la API */
  const { stars } = useAnimeCard();
  return (
    <>
      <button
        disabled={stars !== props.stars || isSelectedStar}
        onClick={() => handleCacheData("stars")}
      >
        🌟: {stars}
      </button>
      <button
        disabled={likes !== props.likes || isSelectedLike}
        onClick={() => handleCacheData("likes")}
      >
        ❤️: {likes}
      </button>
    </>
  );
}
export { AnimeStars };
