import { Router, Request, Response } from "express"
import Groq from "groq-sdk"

const router = Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post("/", async (req: Request, res: Response) => {
  try {
    const { code, style } = req.body

    if (!code) {
      return res.status(400).json({ error: "Code is required" })
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a technical writer. Generate ${style || "JSDoc"} documentation for the provided code. Return the original code with documentation comments added.`,
        },
        {
          role: "user",
          content: code,
        },
      ],
      max_tokens: 2000,
    })

    const documented = completion.choices[0].message.content || ""
    return res.json({ documented })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

export default router