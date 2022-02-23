// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCountries, getContinents } from "./controllers/home.controller";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const countries = getCountries();
  const continents = getContinents();

  res.status(200).json({ countries, continents });
}