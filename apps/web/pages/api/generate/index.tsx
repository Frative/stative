import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 540, height: 540 })
  await page.goto('/generate/music_cover', { waitUntil: 'networkidle0' })

  page.screenshot({
    path: 'test.jpeg'
  })

  res.status(400).json(undefined)
}