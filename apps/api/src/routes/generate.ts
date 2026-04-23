import { Router, Request, Response } from "express"
import Groq from "groq-sdk"

const router = Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post("/", async (req: Request, res: Response) => {
  try {
    const { prompt, language } = req.body

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" })
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert ${language || "TypeScript"} developer. 
          Return ONLY clean production-ready code with no explanation. 
          Add brief inline comments where helpful.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1500,
    })

    const code = completion.choices[0].message.content || ""
    return res.json({ code, language, cached: false })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

export default router