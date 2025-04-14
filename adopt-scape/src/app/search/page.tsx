/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */
"use client";

import { useEffect, useState } from "react";
import SearchBar, { animal, sort } from "../components/SearchBar/searchbar";
import { CardGroup, Container } from "react-bootstrap";

type token_response = {
  token_type: string;
  expires_in: number;
  access_token: string;
};

export default function SearchApp() {
  const defaultAnimal = animal.Both;
  const defaultSort = sort.Distance;

  const [token, setToken] = useState("");
  const [results, setResults] = useState();
  //const [intervalid, setIntervalid] = useState(setInterval(()=>{}, 2000));
  const [query, setQuery] = useState("");
  const [animalType, setAnimalType] = useState<animal>(defaultAnimal);
  const [sortType, setSortType] = useState<sort>(defaultSort);

  useEffect(() => {
    const getToken = async () => {
      console.log("Fetching");
      try {
        const token_response = await fetch("/api",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
        console.log("Fetching");

        if (!token_response.ok) {
          throw new Error(`HTTP error: ${token_response.status}`);
        }

        const token_data = await token_response.json();

        console.log(token_data);

        setToken(token_data.access_token);
        
        const search_data  = await Search(token_data.access_token);
        console.log(search_data);
        
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    //get token immediately
    getToken();


    //set interval to fetch new token every time it expires
    //clearInterval(intervalid);
    //const id = setInterval(getToken(),  token.expires_in * 100 );
    //setIntervalid(id);

    //clean up when unmounted
    // return () => clearInterval(id);
  }, []);

  const Search = async (token_access: string) => {

    const body = JSON.stringify({
        token_type: "Bearer",
        token: token_access
    });
    
    try {
      const search_response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body
      });

      const search_data = await search_response.json();
      console.log(search_data);
      
      setResults(search_data);
    } catch (error) {
      console.error("error fetching search data", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    useEffect(() => {
      Search(token);
    });
  };

  return (
    <main>
      <SearchBar
        query={query}
        setQuery={setQuery}
        animalType={animalType}
        setAnimalType={setAnimalType}
        defaultAnimal={defaultAnimal}
        sortType={sortType}
        setSortType={setSortType}
        defaultSort={defaultSort}
        onSubmit={handleSearch}
      />
      <Container>
        <CardGroup></CardGroup>
      </Container>
    </main>
  );
}
