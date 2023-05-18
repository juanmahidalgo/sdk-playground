import { Shape } from './factory'

const OPEN_API_SERVER = 'http://localhost:3000'

type Coords = {
  x: number
  y: number
  z: number
}

export interface GeneratedShape {
  shape: Shape
  position: Coords
  rotation?: Coords
  scale?: Coords
}

interface PromptResponse {
  shapes: [GeneratedShape]
}

export const promptOpenAI = async (prompt: string, endpoint = 'prompt'): Promise<PromptResponse> => {
  try {
    // const controller = new AbortController()
    const response = await fetch(`${OPEN_API_SERVER}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      timeout: 300000
    })

    if (!response.ok) {
      throw new Error('Request failed')
    }

    // console.log('await response.json(): ', await response.json());
    const json = await response.json()
    console.log('json: ', json)
    return json
  } catch (error) {
    console.log('error: ', error)
    // Handle any errors here
    console.error('Error:', error)
    throw error
  }
}
