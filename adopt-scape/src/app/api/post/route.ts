"use server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const json = await fetch(`https://api.petfinder.com/v2/animals?type=cat`, {
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

    console.log(data);
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