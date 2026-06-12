import elipse from '../../assets/images/Ellipse 23.png'
import logo from '../../assets/images/Logo.png'
import styles from './style.module.css'
import { useState } from 'react'
import send from '../../assets/images/send.png'
// import { sendMessage } from './api/gegitminiCall'

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState<{ role: 'user' | 'model'; text: string }[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChatOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleMessageSend = async () => {
    if (!inputValue.trim()) return
    setLoading(true)

    const userMessage: { role: 'user' | 'model'; text: string } = {
      role: 'user',
      text: inputValue,
    }

    const newMessage = [...message, userMessage]

    setMessage(newMessage)
    setInputValue('')
    try {
      // const geminiAnswer = await sendMessage(newMessage);
      setMessage((prev) => [
        ...prev,
        // { role: 'model', text: geminiAnswer }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
      {isOpen ? (
        <div className={styles.mainChatWrapper}>
          <div className={styles.mainChat}>
            <div className={styles.titleDiv}>
              <img src={logo} />
              <p>Ask anything!</p>
            </div>
            <div className={styles.messagesArea}>
              <p>
                Hi! I am Gemini's helper.
                <br /> How can I help you?
              </p>
              {message.map((msg, i) => (
                <p key={i} className={msg.role === 'user' ? styles.userMsg : styles.modelMsg}>
                  {msg.text}
                </p>
              ))}
            </div>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Type your message here..."
                value={inputValue}
                disabled={loading}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
              />
              <img src={send} onClick={handleMessageSend} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrap} onClick={handleChatOpen}>
          <div className={styles.robotLogo}>
            <img src={elipse} />
            <img src={logo} />
          </div>
        </div>
      )}
    </>
  )
}
