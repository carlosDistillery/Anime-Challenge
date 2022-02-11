import React from "react";
import { AnimeCardContextProps, Anime } from "../../../types/anime";

const AnimeCardContext = React.createContext({} as AnimeCardContextProps);

interface Props {
  children: React.ReactElement | React.ReactElement[];
  values: {
    anime: Anime;
  };
}

export function AnimeCardProvider(props: Props) {
  const [stars, setStars] = React.useState(
    props.values.anime.attributes.userCount
  );
  const [isSelectedStar, setIsSelectedStars] = React.useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("stars")) {
      // @ts-expect-error
      const isSelected = JSON.parse(localStorage.getItem("stars")).filter(
        (anime: { title: string }) =>
          anime.title === props.values.anime.attributes.slug
      );

      return !!isSelected.length;
    } else {
      return false;
    }
  });
  const [likes, setLikes] = React.useState(
    props.values.anime.attributes.favoritesCount
  );
  const [isSelectedLike, setIsSelectedLike] = React.useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("likes")) {
      // @ts-expect-error
      const isSelected = JSON.parse(localStorage.getItem("likes")).filter(
        (anime: { title: string }) =>
          anime.title === props.values.anime.attributes.slug
      );
      return !!isSelected.length;
    } else {
      return false;
    }
  });

  const handleCacheDataLikes = () => {
    if (isSelectedLike) {
      setIsSelectedLike(false);
      // @ts-expect-error
      const data = JSON.parse(localStorage.getItem("likes"));
      const dataFiltered = data.filter((anime: any) => {
        return anime.title !== props.values.anime.attributes.slug;
      });

      localStorage.setItem("likes", JSON.stringify(dataFiltered));
    } else {
      setIsSelectedLike(true);
      if (!localStorage.getItem("likes")) {
        localStorage.setItem(
          "likes",
          JSON.stringify([{ title: props.values.anime.attributes.slug }])
        );
      } else {
        // @ts-expect-error
        const data = JSON.parse(localStorage.getItem("likes"));
        data.push({ title: props.values.anime.attributes.slug });
        localStorage.setItem("likes", JSON.stringify(data));
      }
    }
  };

  const handleCacheDataStars = () => {
    if (isSelectedStar) {
      setIsSelectedStars(false);
      // @ts-expect-error
      const data = JSON.parse(localStorage.getItem("stars"));
      const dataFiltered = data.filter((anime: any) => {
        return anime.title !== props.values.anime.attributes.slug;
      });
      localStorage.setItem("stars", JSON.stringify(dataFiltered));
    } else {
      setIsSelectedStars(true);
      if (!localStorage.getItem("stars")) {
        localStorage.setItem(
          "stars",
          JSON.stringify([{ title: props.values.anime.attributes.slug }])
        );
      } else {
        // @ts-expect-error
        const data = JSON.parse(localStorage.getItem("stars"));
        data.push({ title: props.values.anime.attributes.slug });
        localStorage.setItem("stars", JSON.stringify(data));
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
    handleCacheDataLikes,
    handleCacheDataStars,
    anime: props.values.anime,
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
