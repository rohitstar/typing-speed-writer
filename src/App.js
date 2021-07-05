import './App.css'
// import Typewriter from './component/typewriter'
import TypingSpeed from './component/typingSpeed/typing-speed'

function App() {
  return (
    <div className="App">
      <div className="type">
        {/* <Typewriter
          text="A wonderful serenity has taken possession of my entire soul like these
         mornings of spring which I enjoy with my whole heart I am alone
        and feel the charm of existence in this spot which was created for the
        bliss of souls like mine I am so happy my dear friend so absorbed in
        the exquisite sense of mere tranquil existence that I neglect my
        talents I should be incapable of drawing a single stroke at the present
        moment and yet I feel that I never was a greater artist than now When
        while the lovely"
        /> */}

        <TypingSpeed />
      </div>
    </div>
  )
}

export default App
