// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCountries, getContinents, getLanguagesSpoken } from "./controllers/home.controller";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const continents = getContinents();
  const languages = getLanguagesSpoken();

  res.status(200).json({ continents, languages });
}