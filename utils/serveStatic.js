import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

   const filePath = path.join(baseDir, 'public',
      `${req.url === '/' ? 'index.html' : req.url}`
   )

   const ext = path.extname(filePath)
   const contentType = getContentType(ext)

   try {
      const content = await fs.readFile(filePath)
      sendResponse(res, 200, contentType, content)
   } catch (error) {
      if (error.code === 'ENOTDIR') {
         const content = await fs.readFile(path.join(baseDir, 'public', '404.html'))
         sendResponse(res, 404, 'text/html', content)
      } else {
         sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${error.code}</h1></html>`)
      }
   }

}
