import React from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { Anime } from "../types/anime";
import { axiosInstance } from "../axiosInstance/index";
import { filterBySelectOption } from "../utils/index";

const requestAnimes = async () => {
  const {
    data: { data },
  }: AxiosResponse<{
    data: Anime[] | [];
    meta: { count: number };
    links: { first: string; next: string; last: string };
  }> = await axiosInstance.get("anime");

  return data;
};

export function useAnimes() {
  const [filter, setFilter] = React.useState<"all" | "stars" | "likes">("all");

  const selectFn = React.useCallback(
    (data) => filterBySelectOption({ animes: data, filter }),
    [filter]
  );

  const { data, isLoading, isError } = useQuery("animes", requestAnimes, {
    select: filter === "all" ? undefined : selectFn,
  });

  return { response: data, isLoading, isError, setFilter };
}
