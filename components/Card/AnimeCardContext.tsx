import React from "react";
import { AnimeCardContextProps } from "../../types/anime";

const AnimeCardContext = React.createContext({} as AnimeCardContextProps);

interface Props {
  children: React.ReactElement | React.ReactElement[];
  values: {
    title: string;
    likes?: number;
    stars?: number;
  };
}

export function AnimeCardProvider(props: Props) {
  const [stars, setStars] = React.useState(props.values.stars);
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
  const [likes, setLikes] = React.useState(props.values.likes);
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
    if (stars && likes) {
      cacheKey === "stars" ? setStars(stars + 1) : setLikes(likes + 1);
      if (!localStorage.getItem(cacheKey)) {
        localStorage.setItem(
          cacheKey,
          JSON.stringify([{ title: props.values.title }])
        );
      } else {
        const data = JSON.parse(localStorage.getItem(cacheKey));
        data.push({ title: props.values.title });
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }
    }
  };

  const value = {
    stars,
    setStars,
    isSelectedStar,
    likes,
    setLikes,
    isSelectedLike,
    handleCacheData,
  };

  return (
    <AnimeCardContext.Provider value={value}>
      {props.children}
    </AnimeCardContext.Provider>
  );
}

export function useAnimeCard() {
  const context = React.useContext(AnimeCardContext);
  if (!context) {
    throw new Error("You need to use it into a provider");
  }

  return context;
}
