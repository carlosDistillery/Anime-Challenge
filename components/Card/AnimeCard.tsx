import { AnimeCardProvider } from "./AnimeCardContext";

export interface Props {
  children: JSX.Element | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  values: {
    title: string;
    likes?: number;
    stars?: number;
  };
}

export const AnimerCard = (props: Props) => {
  <div>
    <AnimeCardProvider values={props.values}>
      {props.children}
    </AnimeCardProvider>
  </div>;
};
