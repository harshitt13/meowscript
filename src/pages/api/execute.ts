import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "🐾 Oops! Only POST requests are allowed, hooman! 😾" });
  }

  try {
    const response = await fetch("http://localhost:8080", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res.status(200).json({
      status: "🐱 Purrfect execution!",
      message: "MeowScript code ran successfully! 🐾",
      result: data.output,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "😿 Uh-oh! The server scratched its head and got confused!",
      details: "Something went wrong while running your MeowScript code. Try again!",
    });
  }
}
