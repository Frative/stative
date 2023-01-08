import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(process.env.HOST + '/generate/music_cover')
  url.searchParams.append('name', req.query['name'] as string)
  url.searchParams.append('quote', req.query['quote'] as string)
  url.searchParams.append('author', req.query['author'] as string)
  url.searchParams.append('image', decodeURIComponent(req.query['image'] as string))

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 540, height: 540 })
  await page.goto(url.href, { waitUntil: 'networkidle0' })

  const imageBuffer = await page.screenshot({ encoding: 'binary', type: 'jpeg', quality: 100 })
  await browser.close()

  res.setHeader('Content-Type', 'image/jpeg')
  res.setHeader('Content-Disposition', 'attachment; filename="filename.jpg"; filename*="filename.jpg"');
  res.send(imageBuffer)
}