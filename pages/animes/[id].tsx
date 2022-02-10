import { NextPageContext } from "next";
import Link from "next/link";
import { Anime } from "../../types/anime";
import { useCharacters } from "../../hooks/useCharacters";
import { useEpisodes } from "../../hooks/useEpisodes";
// * Styles
import styles from "../../styles/anime.module.css";

function Pokemon({ id, data }: { id: string; data: Anime }) {
  const { response } = useCharacters(id);
  const { response: episodes } = useEpisodes(id);

  return (
    <div className={styles.container}>
      <div>
        <div>
          <Link href="/">Back</Link>
          <img alt="Anime" />
        </div>
      </div>
      <div>
        <div>
          <h1>{data?.attributes?.slug}</h1>
          <p>{data.attributes.synopsis}</p>
        </div>
        <section>
          <h3>Characters</h3>
          <div>
            {response?.map((obj) => {
              return <div key={obj.id}>{obj.id}</div>;
            })}
          </div>
        </section>
        <section>
          <h3>Episodes</h3>
          <div>
            {episodes?.map((obj) => {
              return <button key={obj.id}>{obj.id}</button>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

Pokemon.getInitialProps = async (ctx: NextPageContext) => {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${ctx.query.id}`);
  const json = await res.json();
  return { id: ctx.query.id, data: json.data };
};
export default Pokemon;
