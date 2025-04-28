"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  delay: number
  duration: number
  type: "circle" | "square" | "triangle" | "line"
}

export default function Confetti() {
  const confettiCount = 100
  const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE", "#FFFFFF"]
  const confettiRef = useRef<ConfettiPiece[]>([])

  // Generate confetti pieces on mount
  useEffect(() => {
    confettiRef.current = Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random starting position (percentage)
      y: Math.random() * -10 - 10, // start above the viewport
      size: Math.random() * 8 + 4, // random size between 4-12px
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5,
      duration: Math.random() * 3 + 2, // fall duration between 2-5 seconds
      type: ["circle", "square", "triangle", "line"][Math.floor(Math.random() * 4)] as any,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {confettiRef.current.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.type === "line" ? "transparent" : piece.color,
            width: piece.type === "line" ? `${piece.size * 2}px` : `${piece.size}px`,
            height:
              piece.type === "line" ? "1px" : piece.type === "triangle" ? `${piece.size * 0.866}px` : `${piece.size}px`,
            borderRadius: piece.type === "circle" ? "50%" : piece.type === "triangle" ? "0" : "2px",
            clipPath: piece.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
            border: piece.type === "line" ? `1px solid ${piece.color}` : "none",
            zIndex: 10,
          }}
          initial={{
            y: "-10vh",
            x: `calc(${piece.x}vw)`,
            opacity: 1,
            rotate: piece.rotation,
            scale: 0,
          }}
          animate={{
            y: "110vh",
            x: `calc(${piece.x}vw + ${Math.random() * 20 - 10}vw)`,
            opacity: [0, 1, 1, 0],
            rotate: piece.rotation + Math.random() * 360,
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.1, 0.4, 0.8, 0.9],
          }}
        />
      ))}
    </div>
  )
}
