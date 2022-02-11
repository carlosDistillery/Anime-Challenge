import { useQuery } from "react-query";
import { axiosInstance } from "../axiosInstance/index";
import { AxiosResponse } from "axios";

const fetchUrl = async (props: any) => {
  const { queryKey } = props;

  const {
    data,
  }: AxiosResponse<{
    data: { id: string; type: string }[];
    links: {
      related: string;
      self: string;
    };
  }> = await axiosInstance.get(`anime/${queryKey[1]}/relationships/characters`);

  const charactersPromises = data.data.slice(0, 10).map((character) => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://kitsu.io/api/edge/media-characters/${character.id}/character`
      )
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          resolve(info);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  });

  const info = await Promise.all(charactersPromises);
  return info;
};

export function useCharacters(id: string) {
  const { data, isLoading, isFetching, isError } = useQuery(
    ["characters", id],
    fetchUrl,
    { refetchOnWindowFocus: false }
  );

  return {
    characters: data,
    isFetching,
    isLoading,
    isError,
  };
}
