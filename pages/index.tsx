// @ts-nocheck
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
// * Types
import { Anime } from "../types/anime";
// * Components
import { useAnimes } from "../hooks/useAnimes";
import InfiniteScroll from "react-infinite-scroller";
import { AnimerCard } from "../components/Card/AnimeCard";
import { AnimeStars } from "../components/Card/AnimeStars";
import { AnimeImage } from "../components/Card/AnimeImage";
import { BallTriangle } from "react-loader-spinner";
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BallTriangle width="100" color="lightblue" ariaLabel="loading" />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className={styles.container}>
        <h1>Anime List</h1>
        <p>Theres and error :c</p>
      </div>
    );

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFilter(e.target?.animeToSearch?.value);
  };

  const getResults = () => {
    if (filter === "stars" || filter === "likes") {
      return JSON.parse(localStorage.getItem(filter)).length;
    } else {
      return response?.pages?.length * 10;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Code Challenge</title>
        <meta name="description" content="Code Challenge" />
      </Head>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Anime List</h1>
      </div>
      <div className={styles.filterContainer}>
        <div>
          Filter:
          <button
            style={{ background: "none", border: 0, cursor: "pointer" }}
            onClick={() => setFilter(filter === "stars" ? "all" : "stars")}
          >
            🌟
          </button>
          <button
            style={{ background: "none", border: 0, cursor: "pointer" }}
            onClick={() => setFilter(filter === "likes" ? "all" : "likes")}
          >
            ❤️
          </button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <label>
            <input
              name="animeToSearch"
              style={{ borderRadius: 10, width: 300 }}
              type="text"
            />
          </label>
        </form>

        <div> {getResults()} Results</div>
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
        >
          {response?.pages.map((page) => {
            return page.data.map((anime: Anime) => {
              return (
                <AnimerCard
                  key={anime.attributes.slug}
                  values={{
                    anime: anime,
                  }}
                >
                  <AnimeImage />
                  <AnimeStars />
                </AnimerCard>
              );
            });
          })}
        </InfiniteScroll>

        {isFetching && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2em",
            }}
          >
            <BallTriangle width="100" color="lightblue" ariaLabel="loading" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
