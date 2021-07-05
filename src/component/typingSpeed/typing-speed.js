import React, { useState, useEffect, useRef } from 'react'
import './typing-speed.css'

// mango papaya apple banana orange java react react native boostrap html css typing speed data
const text = () =>
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
   Ut enim ad minim veniam, quis nostrud exercitation ullamco 
   laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
   irure dolor in reprehenderit in voluptate velit esse cillum
    dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
    cupidatat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`.split(' ')
// .sort(() => (Math.random() > 0.5 ? 1 : -1))

const WordChange = React.memo(function WordChange(props) {
  const { texted, active, correct } = props

  if (correct === true) {
    return <span className="correct">{texted} </span>
  }

  if (correct === false) {
    return <span className="incorrect">{texted} </span>
  }

  if (active) {
    return <span className="active">{texted} </span>
  }

  return <span>{texted} </span>
})

// WordChange = React.memo(WordChange)

function TypingSpeed() {
  const [Input, setInput] = useState('')
  const writingText = useRef(text())

  const [startCounting, setStartCounting] = useState(false)
  const [activeWord, setActiveWord] = useState(0)
  const [correctWord, setCorrectWord] = useState([])
  const [completed, setCompleted] = useState(true)
  //   console.log(writingText.current)

  function Counter(startCounted) {
    const [timeEl, setTimeEl] = useState(0)
    // const { startCounted, correctWords } = props
    //   const [completedTime, setCompletedTime] = useState(false)

    useEffect(() => {
      let countId

      if (startCounted) {
        countId = setInterval(() => {
          if (timeEl < 60) {
            setTimeEl((oldTime) => oldTime + 1)
            console.log(timeEl)
          } else {
            setCompleted(false)
          }
        }, 1000)
      }

      return () => {
        clearInterval(countId)
      }
    }, [startCounted, timeEl])

    const wordMinutes = timeEl / 60
    const WordChar = correctWord.filter(Boolean).length

    return (
      <div className="result">
        <p className="time">
          <b>Time : </b>
          {timeEl}
        </p>
        {/* <p className="completeTime">{completedTime}</p> */}
        <p className="speed">
          <b>Speed : </b>
          {(WordChar / wordMinutes || 0).toFixed(2)} WPM
        </p>
      </div>
    )
  }

  function getInputChangeHandler(value) {
    if (activeWord === writingText.current.length) {
      return
    }

    if (!startCounting) {
      setStartCounting(true)
      setCompleted(true)
    }

    if (value.endsWith(' ')) {
      if (activeWord === writingText.current.length - 1) {
        setStartCounting(false)
        setCompleted(false)
      } else {
        setInput('')
      }

      //   if ()

      setActiveWord((idx) => idx + 1)

      setCorrectWord((data) => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeWord] = word === writingText.current[activeWord]
        return newResult
      })
    } else {
      setInput(value)
    }
  }

  return (
    <div className="text-container">
      {/* <Counter
        startCounted={startCounting}
        correctWords={correctWord.filter(Boolean).length}
        completed={completed}
      /> */}
      {Counter(startCounting)}

      <div>
        <h1 className="heading">Typing Master</h1>

        <div className="text">
          {writingText.current.map((text, index) => {
            //   if (index === activeWord) {
            //     return <b>{text} </b>
            //   }
            return (
              <WordChange
                key={index}
                texted={text}
                active={index === activeWord}
                correct={correctWord[index]}
                //   incorrect={false}
              />
            )
          })}
          {completed ? (
            <input
              className="input"
              placeholder="Start Typing......"
              onChange={(e) => getInputChangeHandler(e.target.value)}
              type="text"
              value={Input}
            />
          ) : (
            <div>
              <h1 className="time-over">Time Over</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TypingSpeed
