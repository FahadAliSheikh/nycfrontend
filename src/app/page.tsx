"use client";
export interface PostsList {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: [PostObject];
}

export interface PostObject {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: [string];
  org_facet: [string];
  per_facet: [string];
  geo_facet: [string];
  multimedia: [MultimediaObject];
  short_url: string;
}

export interface MultimediaObject {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

import { useEffect, useState } from "react";
import PostCard from "./components/PostCard";

function Home() {
  const [data, setData] = useState<PostsList>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`
        ); // Make a request to the localhost API http://localhost:3333
        if (response.ok) {
          const apiData: PostsList = await response.json();
          setData(apiData);
          setIsLoading(false);
        } else {
          // console.error("Failed to fetch data from the API");
          setIsLoading(false);
          setIsError("Failed to fetch data from the API");
        }
      } catch (error) {
        // console.error("Error while fetching data:", error);
        setIsLoading(false);
        setIsError("Failed to fetch data from the API");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container my-24 mx-auto md:px-6">
      {/* <!-- Section: Design Block --> */}
      <section className="mb-32 text-center md:text-left">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Latest articles
        </h2>
        {isLoading && <p>Data is loading...</p>}
        {isError && <p>{isError}</p>}
        {/* Post Card start */}
        {!isLoading &&
          data &&
          data?.results?.map((post: PostObject) => (
            <div key={post.title}>
              <PostCard post={post} />
            </div>
          ))}
        {/* Post Card end */}
      </section>
    </div>
  );
}

export default Home;
