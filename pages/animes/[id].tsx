import { NextPageContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { Anime as AnimeType } from "../../types/anime";
// * Styles
import styles from "../../styles/anime.module.css";
// * Hooks
import { useCharacters } from "../../hooks/useCharacters";
import { useEpisodes } from "../../hooks/useEpisodes";
// * Components
import { AnimerCard } from "../../components/Card/AnimeCard";
import { AnimeDetails } from "../../components/Card/AnimeDetails";
import { AnimeStars } from "../../components/Card/AnimeStars";
import { AnimeImage } from "../../components/Card/AnimeImage";
import { Episode } from "../../components/Episode/Episode";

function Anime({ id, data }: { id: string; data: AnimeType }) {
  const { characters, isLoading } = useCharacters(id);
  const { response: episodes } = useEpisodes(id);

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AnimerCard values={{ anime: data }}>
          <Link href="/"> ◀️ Back </Link>
          <AnimeImage />
          <AnimeStars />
          <AnimeDetails />
        </AnimerCard>
      </div>
      <div>
        <div>
          <h1>{data?.attributes?.slug}</h1>
          <p>{data.attributes.synopsis}</p>
        </div>
        <section>
          <h3>Characters</h3>
          {isLoading && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
              }}
            >
              Loading...
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              minHeight: 320,
              gridGap: "1em",
            }}
          >
            {characters?.map((chacracter: any) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexFlow: "column",
                    maxWidth: 100,
                    textOverflow: "ellipsis",
                  }}
                  key={chacracter.data.attributes.id}
                >
                  <Image
                    src={chacracter.data.attributes.image?.small}
                    alt={chacracter.data.attributes.canonicalName}
                    width={100}
                    height={100}
                  />
                  {chacracter.data.attributes.canonicalName}
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h3>Episodes</h3>

          <div>
            {episodes?.slice(0, 10).map((obj) => {
              return <Episode key={obj.id} episode={obj.id} />;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

Anime.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${ctx.query.id}`);
  const json = await res.json();
  return { id: ctx.query.id, data: json.data };
};
export default Anime;
