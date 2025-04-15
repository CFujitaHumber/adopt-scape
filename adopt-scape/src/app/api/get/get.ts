/**
 * @author Carson Fujita
 * @copyright Carson Fujita
 * Example api
 */
"use server";
import { NextApiRequest, NextApiResponse } from 'next';


type props = {
    req: NextApiRequest;
    res: NextApiResponse;
}

export default async function GET({req, res}: props) {
    const body = JSON.parse(req.body);
     try{
            const json = await fetch(`https://api.petfinder.com/v2/animals?type=cat`, {
            method: "GET",
            headers: { 
                "Authorization": `${body.token_type} ${body.token}`,
                "Content-Type": "application/json" },
            },
        );

            if(!json.ok){
                throw new Error(`HTTP error: ${json.status}: ${json.statusText}`)
            }

            const data = await json.json();

            console.log(data);
            return res.status(200).json(data);
        } catch(error){
            console.error("Error fetching :", error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
}