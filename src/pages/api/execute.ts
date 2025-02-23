import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

  // Send code to Go backend
  const goResponse = await fetch('http://localhost:8080/execute', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await goResponse.json();

  res.status(200).json(result);
}