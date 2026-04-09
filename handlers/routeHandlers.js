import { stories } from "../data/stories.js"
import { sightingEvents } from "../events/sightingEvents.js"
import { addNewSighting } from "../utils/addNewSighting.js"
import { getData } from "../utils/getData.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { sanitizeInput } from "../utils/samitizeInput.js"
import { sendResponse } from "../utils/sendResponse.js"

export async function handleGet(res) {
  sendResponse(res, 200, 'application/json', JSON.stringify(await getData()))
}

export async function handlePost(req, res) {
  try {
    const parsedBody = await parseJSONBody(req)
    const sanitizedBody = sanitizeInput(parsedBody)
    await addNewSighting(sanitizedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
    sightingEvents.emit('sighting-added', sanitizedBody)

  } catch (err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))

  }
}

export async function handleNews(req, res) {
  res.statusCode = 200

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)

    res.write(
      `data: ${JSON.stringify({ event: 'news-updated', story: stories[randomIndex] })}\n\n`
    )
  }, 3000)
}