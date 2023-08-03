import React, { useCallback, useEffect, useState } from "react";
import { useSearchContext } from "@/Providers/searchProvider";
import NavBar from "@/components/NavBar/NavBar";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./Genre.module.css";
import Link from "next/link";

const Genre = ({mediaType,category}) => {

  const [genre, setGenre] = useState([]);
  const { setSearchQuery } = useSearchContext();

  console.log(mediaType);

  const fetchDataByGenre = useCallback( async () => {
    await fetch(`/api/AllFetch?media_type=${mediaType}&category=Genre&api_key=${process.env.API_KEY_TMDB}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGenre(data.genres);
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => console.log("done"));
  }, [mediaType]);


  useEffect(() => {
    fetchDataByGenre();
  }, [fetchDataByGenre]);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.containerGenre}>
        <SearchBar
          onSearch={setSearchQuery}
          placeholder={"Search for movies"}
        />
        <div>
          <h3 className={styles.h3}>Genre</h3>
          <div className={styles.grid}>
            {genre.map((genre) => (
              <Link className={styles}  href={`${category}/genre?genresid=${genre.id}&genreName=${genre.name}`} key={genre.id}><div  className={styles.square}>
                <h3>{genre.name}</h3>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
