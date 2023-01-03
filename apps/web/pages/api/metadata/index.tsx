import type { NextApiRequest, NextApiResponse } from 'next'

import MetaParser from 'metascraper'
import MetaTitleRule from 'metascraper-title'
import MetaImageRule from 'metascraper-image'

export interface ApiMetadataResponse {
  title: string
  image: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiMetadataResponse>) {
  const domain = req.query['domain'] as string
  const validDomain = domain.search('https://') != -1

  if (validDomain) {
    
    const result = await fetch(domain)
    const text = await result.text()
    
    const metascraper = MetaParser([
      MetaTitleRule(),
      MetaImageRule(),
    ])
    
    const response = await metascraper({
      url: domain,
      html: text
    })

    res.status(200).json(response)
  }

  if (!validDomain) {
    res.status(400).json(undefined)
  }
}