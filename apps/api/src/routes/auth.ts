import { Router, Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const router = Router()

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" })
    }
    const token = jwt.sign(
      { email, role: "owner" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )
    return res.status(201).json({
      token,
      user: { name, email, role: "owner" }
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" })
    }
    const token = jwt.sign(
      { email, role: "owner" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    )
    return res.json({
      token,
      user: { email, role: "owner" }
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return res.status(500).json({ error: message })
  }
})

export default router