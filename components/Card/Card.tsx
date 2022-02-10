import React from "react";
import Link from "next/link";
import styles from "../../styles/card.module.css";

interface CardProps {
  id: number;
  title: string;
  stars: number;
  likes: number;
}

function Card(props: CardProps) {
  // * Lazy initialization for performance app
  const [stars, setStars] = React.useState(props.stars);
  const [isSelectedStar] = React.useState(() => {
    if (localStorage.getItem("stars")) {
      const isSelected = JSON.parse(localStorage.getItem("stars")).filter(
        (anime: { title: string }) => anime.title === props.title
      );
      return !!isSelected.length;
    } else {
      return false;
    }
  });
  const [likes, setLikes] = React.useState(props.likes);
  const [isSelectedLike] = React.useState(() => {
    if (localStorage.getItem("likes")) {
      const isSelected = JSON.parse(localStorage.getItem("likes")).filter(
        (anime: { title: string }) => anime.title === props.title
      );
      return !!isSelected.length;
    } else {
      return false;
    }
  });

  const handleCacheData = (cacheKey: "stars" | "likes") => {
    cacheKey === "stars" ? setStars(stars + 1) : setLikes(likes + 1);

    if (!localStorage.getItem(cacheKey)) {
      localStorage.setItem(cacheKey, JSON.stringify([{ title: props.title }]));
    } else {
      const data = JSON.parse(localStorage.getItem(cacheKey));
      data.push({ title: props.title });
      localStorage.setItem(cacheKey, JSON.stringify(data));
    }
  };

  return (
    <div className={styles.cardContainer}>
      <Link href={`/animes/${props.id}`}>{props.title}</Link>
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
    </div>
  );
}

export { Card };
