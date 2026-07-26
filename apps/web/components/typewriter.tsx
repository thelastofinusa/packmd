import React from "react"
import { motion } from "motion/react"

export const Typewriter: React.FC<{ text: string }> = (props) => {
  const [displayed, setDisplayed] = React.useState<string>("")

  React.useEffect(() => {
    let index = 0

    setDisplayed("")

    const interval = setInterval(() => {
      index++

      setDisplayed(props.text.slice(0, index))

      if (index >= props.text.length) {
        clearInterval(interval)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [props.text])

  return (
    <span>
      {displayed}

      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-0.5"
      >
        █
      </motion.span>
    </span>
  )
}
