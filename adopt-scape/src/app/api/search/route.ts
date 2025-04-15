/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 * Requires the token from token/route.ts, gets the search data
 */
"use server";

export async function POST(req: Request) {
  const body = await req.json();

  //get data from body
  const {
    animalType,
    breed,
    size,
    gender,
    age,
    color,
    coat,
    //status, not needed
    name,
    organization,
    good_with_children,
    good_with_dogs,
    good_with_cats,
    house_trained,
    declawed,
    special_needs,
    latitude,
    distance,
    before,
    after,
    longitude,
    sortType,
    pagination,
  } = body;

  //handle bad requests
  if (animalType === undefined) {
    return new Response("Error: No Animal", {
      status: 400,
      headers: { error: "Request contains no animal type" },
    });
  }

  if (sortType == undefined) {
    return new Response("Error: No Sort", {
      status: 400,
      headers: { error: "Request contains no sort type" },
    });
  }

  //add all possible parameters to search
  const url = `https://api.petfinder.com/v2/animals?type=${animalType}` +
  (breed && `&breed=${breed}` || "") +
  (size && `&size=${size}` || "") +
  (gender && `&gender=${gender}` || "") +
  (age && `&age=${age}` || "") +
  (color && `&color=${color}` || "") +
  (coat && `&coat=${coat}` || "")+
  (name && `&name=${name}` || "") +
  (organization && `&organization=${organization}` || '') +
  (good_with_children === undefined ? '' : `&good_with_children=${good_with_children}`) +
  (good_with_dogs === undefined? '' : `&good_with_dogs=${good_with_dogs}`) +
  (good_with_cats === undefined? '' : `&good_with_cats=${good_with_cats}`) +
  (house_trained === undefined? '': `&house_trained=${house_trained}`) +
  (declawed === undefined? '': `&declawed=${declawed}`) +
  (special_needs === undefined? '' : `&special_needs=${special_needs}`) +
  (latitude === undefined ? "": `&location=${latitude},${longitude}`) +
  ((latitude === undefined || distance === undefined) ? "" : `&distance=${distance}`) +
  (before && `&before=${before}` || '') +
  (after && `&after=${after}` || '') +
  `&sort=${sortType}` + //mandatory due to defensive programming
  (pagination === undefined ? "" : `&page=${pagination}`);

  //note that the 'limit' parameter is not included.

  console.log(url);
  

  try {
    //send request to api
    const json = await fetch(url,
      {
        method: "GET",
        headers: {
          Authorization: `${body.token_type} ${body.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!json.ok) {
      throw new Error(`HTTP error: ${json.status}: ${json.statusText}`);
    }

    const data = await json.json();

    //return results
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching token:", error);
    return new Response("Error", {
      status: 500,
      headers: { error: `${error}` },
    });
  }
}
