import dotenv from 'dotenv'

let isLoaded = false

export const loadGeminiEnv = () => {
  if (isLoaded) {
    return
  }

  dotenv.config()
  dotenv.config({ path: '.env.local' })
  isLoaded = true
}
