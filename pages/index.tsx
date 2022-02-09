import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
// * Types
import { Anime } from "../types/anime";
// * Components
import { Card } from "../components/Card/Card";
import { useAnimes } from "../hooks/useAnimes";
import InfiniteScroll from "react-infinite-scroller";

const Home: NextPage = () => {
  const {
    response,
    isLoading,
    isError,
    setFilter,
    filter,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useAnimes();

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
      <div className={styles.filterContainer}>
        <div>
          Filter:
          <button
            onClick={() => setFilter(filter === "stars" ? "all" : "stars")}
          >
            🌟
          </button>
          <button
            onClick={() => setFilter(filter === "likes" ? "all" : "likes")}
          >
            🖤
          </button>
        </div>
        <form>
          <label>
            <input type="text" />
          </label>
        </form>

        <div> {response?.pages?.length * 10} Results</div>
      </div>

      <main>
        <InfiniteScroll
          style={{
            display: "flex",
            flexWrap: "wrap",
            gridGap: "1em",
            justifyContent: "center",
          }}
          loadMore={fetchNextPage}
          hasMore={hasNextPage}
          // useWindow={false}
        >
          {response?.pages.map((page) => {
            return page.data.map((anime: Anime) => {
              return (
                <Card
                  id={anime.id}
                  key={anime.attributes.slug}
                  title={anime.attributes.slug}
                  likes={anime.attributes.favoritesCount}
                  stars={anime.attributes.userCount}
                />
              );
            });
          })}
        </InfiniteScroll>
        {isFetching && <p>Loading...</p>}
      </main>
    </div>
  );
};

export default Home;
