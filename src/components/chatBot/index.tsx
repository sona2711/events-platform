import { useCallback, useEffect, useRef, useState } from 'react'
import { MarkdownText } from '@/components/_shared/MarkdownText'
import {
  createAssistantMessage,
  createUserMessage,
} from '@/components/features/ScheduleAssistantChat/utils'
import { fetchScheduleChatReply } from '@/services/scheduleAssistantApi'
import type { ScheduleChatMessage } from '@/types/scheduleAssistant'
import elipse from '../../assets/images/Ellipse 23.png'
import logo from '../../assets/images/Logo.png'
import send from '../../assets/images/send.png'
import styles from './style.module.css'

const WELCOME_MESSAGE = createAssistantMessage(
  "Welcome to Pulsar, I'm here to help you find exciting events. What can I help you find today?",
)

export const Chat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ScheduleChatMessage[]>([WELCOME_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  const handleMessageSend = useCallback(async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isSending) return

    const userMessage = createUserMessage(trimmed)
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setInputValue('')
    setIsSending(true)
    setError(null)

    try {
      const { reply } = await fetchScheduleChatReply(nextMessages)
      setMessages((current) => [...current, createAssistantMessage(reply)])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get a response.')
      setMessages(messages)
      setInputValue(trimmed)
    } finally {
      setIsSending(false)
    }
  }, [inputValue, isSending, messages])

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
              {messages.map((msg) =>
                msg.role === 'user' ? (
                  <p key={msg.id} className={styles.userMsg}>
                    {msg.content}
                  </p>
                ) : (
                  <div key={msg.id} className={styles.modelMsg}>
                    <MarkdownText content={msg.content} />
                  </div>
                ),
              )}
              {isSending && <p className={styles.modelMsg}>...</p>}
              {error && <p className={styles.errorMsg}>{error}</p>}
              <div ref={messagesEndRef} />
            </div>
            <div className={styles.inputWrapper}>
              <input
                placeholder="Type your message here..."
                value={inputValue}
                disabled={isSending}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && void handleMessageSend()}
              />
              <img src={send} onClick={() => void handleMessageSend()} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrap} onClick={() => setIsOpen((prev) => !prev)}>
          <div className={styles.robotLogo}>
            <img src={elipse} />
            <img src={logo} />
          </div>
        </div>
      )}
    </>
  )
}
