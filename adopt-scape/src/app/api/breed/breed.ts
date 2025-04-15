/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 * This API fetches breed data from another api
 */
"use server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  //get data from body
  const {query, animal} = body;

  //catch no query
  if(query === undefined){
    return new Response("Error: No Query", {
      status: 400,
      headers: { error: "Request contains no query" }
    });
  }

  try {
    const json = await fetch("https://api.petfinder.com/v2/types", {
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

    for (let index = 0; index < data.types.length; index++) {
        const element = data.types[index];
        if(element.name.toLowerCase == query.toLowerCase){
            return
        }
    }

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