import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err)
    console.log("⚠️ Running without database - AI features still work!")
  }
}
connectDB()

app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  res.json({
    status: "ok",
    message: "DevMind API is running",
    database: dbStatus
  })
})

import generateRouter from "./routes/generate"
import debugRouter from "./routes/debug"
import docsRouter from "./routes/docs"
import authRouter from "./routes/auth"

app.use("/api/generate", generateRouter)
app.use("/api/debug", debugRouter)
app.use("/api/docs", docsRouter)
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`✅ DevMind API running on http://localhost:${PORT}`)
})

export default app