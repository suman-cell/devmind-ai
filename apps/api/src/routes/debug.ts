import { Router, Request, Response } from "express"
import Groq from "groq-sdk"

const router = Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post("/", async (req: Request, res: Response) => {
  try {
    const { code, error } = req.body

    if (!code || !error) {
      return res.status(400).json({ error: "Both code and error are required" })
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert debugger. Analyze the code and error.
          Respond in this format:
          
          ROOT CAUSE:
          [explain why the error happens]
          
          FIX:
          [show the corrected code]
          
          EXPLANATION:
          [explain what you changed and why]`,
        },
        {
          role: "user",
          content: `CODE:\n${code}\n\nERROR:\n${error}`,
        },
      ],
      max_tokens: 1500,
    })

    const fix = completion.choices[0].message.content || ""
    return res.json({ fix })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

export default router