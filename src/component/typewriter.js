import React, { useState, useEffect, useRef } from 'react'
import './typewriter.css'

function Typewriter({ text }) {
  const textRef = useRef(0)

  const [textData, setTextData] = useState('')

  const timer = 100

  useEffect(() => {
    const timeoutText = setTimeout(() => {
      setTextData((data) => data + text.charAt(textRef.current))
      textRef.current += 1
    }, 100 / 5 / 0.5)
    return () => {
      clearTimeout(timeoutText)
    }
  }, [textData, text])

  return (
    <div className="text-container">
      <p>{textData}</p>
    </div>
  )
}

export default Typewriter
