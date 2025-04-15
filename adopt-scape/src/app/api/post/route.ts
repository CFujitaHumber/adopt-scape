"use server";
import { animal, sort } from "../../components/SearchBar/searchbar";
export async function POST(req: Request) {
  const body = await req.json();

  //get data from body
  const {latitude, longitude, animalType, sortType, name, pagination} = body;

  //handle bad requests
  if(animalType === undefined){
    return new Response("Error: No Animal", {
      status: 400,
      headers: { error: "Request contains no animal type" }
    });
  }

  if(sortType == undefined){
    return new Response("Error: No Sort", {
      status: 400,
      headers: { error: "Request contains no sort type" }
    });
  }


  // //check for name 
  // if(name != undefined && name.indexOf(' ') >= 0){
  //   return new Response("Error: Search must be spaceless", {
  //     status: 400,
  //     headers: { error: "Request involved wrong format" }
  //   });
  // }

  try {
    const json = await fetch(`https://api.petfinder.com/v2/animals?type=${animalType}`
      + (name === "" ? "" : `&name=${name}`)
      + (latitude === undefined ? '':`&location=${latitude},${longitude}`
      + `&sort=${sortType}`
      + (pagination === undefined? '': `&page=${pagination}`)
      ), {
      method: "GET",
      headers: {
        "Authorization": `${body.token_type} ${body.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!json.ok) {
      throw new Error(`HTTP error: ${json.status}: ${json.statusText}`);
    }

    const data = await json.json();

    //console.log(data);
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
      headers: { error: "Error" },
    });
  }
}