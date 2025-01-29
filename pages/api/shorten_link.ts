// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { nanoid } from 'nanoid';

let cachedDb;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: false });

  cachedDb = client;
  return await client.connect();
}

export default async (req: VercelRequest, res: VercelResponse) => {
  const db = await connectToDatabase();

  if (req.body.link) {
    const id = nanoid(5);
    const entry = await db.db('links_db').collection('links_collection').insertOne({ id, link: req.body.link });

    res.statusCode = 201; // created
    return res.json({ short_link: `${process.env.NEXT_PUBLIC_VERCEL_URL}/r/${id}` });
  }

  res.statusCode = 409; // conflict
  res.json({ error: 'no_link_found', error_description: 'No link found' })
}