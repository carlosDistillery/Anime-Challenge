import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
// * Components
import { Card } from "../components/Card/Card";
import { useAnimes } from "../hooks/useAnimes";

const Home: NextPage = () => {
  const { response, isLoading, isError, setFilter } = useAnimes();

  if (isLoading)
    return (
      <div className={styles.container}>
        <h1>Anime List</h1>
        <p>Loading</p>
      </div>
    );

  if (isError)
    return (
      <div className={styles.container}>
        <h1>Anime List</h1>
        <p>There's and error :c</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>Code Challenge</title>
        <meta name="description" content="Code Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Anime List</h1>
      <div className="filter">
        <div>
          Filter:
          <button onClick={() => setFilter("stars")}>🌟</button>
          <button onClick={() => setFilter("likes")}>🖤</button>
        </div>
        <div>Search</div>
        <div>8 Results</div>
      </div>

      <main>
        {response?.map((anime) => {
          return (
            <Card
              key={anime.attributes.slug}
              title={anime.attributes.slug}
              stars={anime.attributes.userCount}
              likes={anime.attributes.favoritesCount}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Home;
