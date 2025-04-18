/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 * This gets the token from the api for OAuth requests
 */
"use server";
import { headers } from "next/headers";

export async function GET(req: Request) {
  console.log("data get");

  const headersList = await headers();
  const referer = headersList.get("referer");

  const id = process.env.REACT_APP_API_KEY || "";
  const secret = process.env.REACT_APP_API_SECRET || "";

  if (id == "" || secret == "") {
    throw new Error(`No ID or Secret in ENV`);
  }

  try {
    const json = await fetch(`https://api.petfinder.com/v2/oauth2/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: id,
        client_secret: secret,
      }),
    });

    if (!json.ok) {
      throw new Error(`HTTP error: ${json.status}: ${json.statusText}`);
    }

    const token_data = await json.json();

    console.log(token_data);
    return new Response(JSON.stringify(token_data), {
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


