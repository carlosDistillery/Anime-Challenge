import Link from "next/link";
import Image from "next/image";
import { useAnimeCard } from "./context/AnimeCardContext";

const myLoader = ({ src }: { src: string }) => {
  return src;
};

function AnimeImage() {
  const { anime } = useAnimeCard();
  return (
    <div style={{ cursor: "pointer" }}>
      <Link href={`/animes/${anime.id}`} passHref>
        <Image
          loader={() => myLoader({ src: anime.attributes.posterImage.tiny })}
          src="me.png"
          alt="Picture of the author"
          width={200}
          height={200}
        />
      </Link>
    </div>
  );
}
export { AnimeImage };
