import fs from 'node:fs/promises'
import path from 'node:path'
import { getData } from './getData.js';


export async function addNewSighting(newSighting) {
  try {
    const sighting = await getData()
    sighting.push(newSighting)

    const dataPath = path.join('data', 'data.json');

    await fs.writeFile(dataPath, JSON.stringify(sighting, null, 2), 'utf8')
    // await fs.writeFile(dirname, `${}`, 'data.json')

  } catch (err) {
    throw new Error(err)
  }
}