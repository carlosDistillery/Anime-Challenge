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
  }> = await axiosInstance.get(`anime/${queryKey[1]}/relationships/episodes`);

  return data.data;
};

export function useEpisodes(id: string) {
  const { data, isLoading, isFetching, isError } = useQuery(
    ["episodes", id],
    fetchUrl
  );

  return {
    response: data,
    isFetching,
    isLoading,
    isError,
  };
}
