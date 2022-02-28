// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCountries, getContinents, getSpokenLanguages } from "./controllers/home.controller";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const countries = getCountries();

  res.status(200).json({ countries });
}