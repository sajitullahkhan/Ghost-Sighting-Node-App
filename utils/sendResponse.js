export function sendResponse(res, status, contentType, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', contentType)
  res.end(payload)
}