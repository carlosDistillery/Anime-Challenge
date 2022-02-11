import { AnimeCardProvider } from "./context/AnimeCardContext";
import { Anime } from "../../types/anime";

export interface Props {
  children: JSX.Element | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  values: {
    anime: Anime;
  };
}

export const AnimerCard = (props: Props) => {
  return (
    <div>
      <AnimeCardProvider values={props.values}>
        {props.children}
      </AnimeCardProvider>
    </div>
  );
};
