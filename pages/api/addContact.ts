// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Contact } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data: Contact = JSON.parse(req.body)

    const mutations = {
        mutations: [
            {
                "create": {
                    "_type": 'message',
                    "name": data.name,
                    "email": data.email,
                    "message": data.message
                }
            }
        ],
    }

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`

    const result = await fetch(apiEndpoint, {
        headers: {
            'content-type': 'application/json',
            Authotization: `Bearer ${process.env.SANITY_API_TOKEN}`
        },
        body: JSON.stringify(mutations),
        method: 'POST'
    })

    const json = await result.json()
    
  res.status(200).json({ message: 'Send!' })
}
