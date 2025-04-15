/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */
"use client";

//next
import { useParams, useRouter } from "next/navigation";

//react
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

//components
import SearchBar, {
  animal,
  sort,
} from "../../../components/SearchBar/searchbar";
import SearchResult from "../../../components/SearchResult/searchResult";

//types

//API result
type search_result = {
  animals: Array<animal_data>;
  pagination: {
    count_per_page: number;
    current_page: number;
    total_count: number;
    total_pages: number;
  };
};

//Animal Data from api
type animal_data = {
  age: string;
  attributes: {
    declawed: boolean;
    house_trained: boolean;
    shots_current: boolean;
    spayed_neutered: boolean;
    special_needs: boolean;
  };
  breeds: {
    mixed: boolean;
    primary: string;
    secondary: string;
    unknown: boolean;
  };
  contact: {
    address: {
      address1: string;
      address2: string;
      city: string;
      country: string;
      state: string;
      postcode: string;
    };
    email: string;
    phone: string;
  };
  description: string;
  distance: number;
  gender: string;
  id: number;
  name: string;
  photos: Array<{ full: string; large: string; medium: string; small: string }>;
};

export default function PetDisplay() {
  //default values
  const defaultSort = "distance";

  const params = useParams();
  const router = useRouter();

  const { pet } = params;

  const [token, setToken] = useState("");
  const [results, setResults] = useState<search_result>();

  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState<sort>(defaultSort);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  /**
   * Get's the users location data
   */
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  useEffect(() => {
    const getToken = async () => {
      console.log("fetching token for client");
      try {
        const token_response = await fetch("/api/token", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!token_response.ok) {
          throw new Error(`HTTP error: ${token_response.status}`);
        }

        const token_data = await token_response.json();

        setToken(token_data.access_token);
        console.log("Token Fetched Successfully");
        
        //const search_data  = await Search(token_data.access_token);
        //console.log(search_data);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    //get user Location
    getUserLocation();

    //get token immediately
    getToken();
  }, []);

  /**
   * Searches the API
   * @param token_access the token
   * @param pagination the page number
   */
  const Search = async (token_access: string, pagination?: number) => {
    const body = JSON.stringify({
      token_type: "Bearer",
      token: token_access,

      //Search Params
      name: query,
      sortType: sortType,
      animalType: pet,
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      pagination: pagination,
    });

    try {
      const search_response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
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
    Search(token);
  };

  //only call if results will not be undefined.
  const handleResults = () => {
    if (results === undefined) {
      return;
    }
    const cards = results.animals.map((animalData: animal_data) => (
      <SearchResult
        key={`${animalData.name.toLowerCase}-${animalData.id}`}
        title={animalData.name}
        imageHref={
          animalData.photos.at(0)?.small ??
          animalData.photos.at(0)?.large ??
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        distanceMsg={Math.round(animalData.distance * 1.60934) + "km away"} //distance data is in miles. Screw miles; all my homies use kilometers.
      />
    ));

    /**
     * Determines if there is a previous page, next page, or more than one page and 
     * then outputs the pagination to match that
     * @returns Pagination
     */
    const handlePagination = () => {
      if (results.pagination.total_pages == 1) {
        return <Pagination.Item active>1</Pagination.Item>;
      } else if (results.pagination.total_pages > 0) {
        return (
          <Pagination className="d-flex justify-content-center">
            {/** IF there is a previous page show */}
            {results.pagination.current_page - 1 > 0 ? (
              <Pagination.Prev
                onClick={(e) => {
                  Search(token, results.pagination.current_page - 1);
                }}
              />
            ) : (
              <></> //nothing
            )}

            <Pagination.Item active>
              {results.pagination.current_page}
            </Pagination.Item>

            {/** If there is a next page show */}
            {results.pagination.current_page + 1 <=
            results.pagination.total_pages ? (
              <Pagination.Next
                onClick={(e) => {
                  Search(token, results.pagination.current_page + 1);
                }}
              />
            ) : (
              <></> //nothing
            )}
          </Pagination>
        );
      }
    };

    return (
      <>
        {/**The display of results */}
        <Row xs={1} md={6} className="g-1 align-items-stretch">
          {Array.from({ length: cards.length }).map((_, idx) => (
            <Col key={idx} className="">
              {cards[idx]}
            </Col>
          ))}
        </Row>
        <Row>
          <Pagination className="d-flex justify-content-center">
            {handlePagination()}
          </Pagination>
        </Row>
      </>
    );
  };

  return (
    <main>
      <Container>
        <SearchBar
          query={query}
          setQuery={setQuery}
          sortType={sortType}
          setSortType={setSortType}
          defaultSort={defaultSort}
          onSubmit={handleSearch}
          isDisabled={token === ""} //prevents search before token
        />
      </Container>
      <Container fluid>
        {results === undefined ? <></> : handleResults()}
      </Container>
    </main>
  );
}