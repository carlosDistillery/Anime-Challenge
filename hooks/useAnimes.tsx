import React from "react";
import { useInfiniteQuery } from "react-query";
import { Anime } from "../types/anime";

import { filterBySelectOption } from "../utils/index";

const fetchUrl = async (
  url: string
): Promise<{
  data: Anime[] | [];
  meta: { count: number };
  links: { first: string; next: string; last: string };
}> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export function useAnimes() {
  const [filter, setFilter] = React.useState<"all" | "stars" | "likes">("all");

  const selectFn = React.useCallback(
    (data) => {
      return {
        pages: filterBySelectOption({ animes: [...data.pages], filter }),
        pageParams: [...data.pageParams],
      };
    },
    [filter]
  );

  const initialUrl =
    "https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=0";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
  } = useInfiniteQuery(
    "animes",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage: any) => lastPage.links.next || undefined,
      select: filter === "all" ? undefined : selectFn,
    }
  );

  return {
    response: data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    setFilter,
    filter,
  };
}
