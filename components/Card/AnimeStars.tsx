import { useAnimeCard } from "./context/AnimeCardContext";

function AnimeStars() {
  const {
    stars,
    likes,
    handleCacheDataLikes,
    handleCacheDataStars,
    isSelectedStar,
    isSelectedLike,
    anime,
  } = useAnimeCard();

  return (
    <div style={{ maxWidth: 200 }}>
      <p style={{ textOverflow: "ellipsis" }}>{anime.attributes.slug}</p>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          style={{ height: 30, width: 90 }}
          onClick={() => handleCacheDataStars()}
        >
          {isSelectedStar ? "★" : "☆"} {stars}
        </button>
        <button
          style={{ height: 30, width: 90 }}
          onClick={() => handleCacheDataLikes()}
        >
          {isSelectedLike ? "💔" : "❤️️"} {likes}
        </button>
      </div>
    </div>
  );
}
export { AnimeStars };
