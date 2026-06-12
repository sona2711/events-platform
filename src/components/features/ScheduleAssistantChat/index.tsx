import { RobotOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Avatar, Button, Card, Flex, Input, Spin } from 'antd'
import { MarkdownText } from '@/components/_shared/MarkdownText'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchScheduleChatReply } from '@/services/scheduleAssistantApi'
import type { ScheduleChatMessage } from '@/types/scheduleAssistant'
import { linkifyScheduleEventLinks } from '@/data/scheduleAssistantEvents'
import { createAssistantMessage, createUserMessage } from './utils'
import type { ScheduleAssistantChatProps } from './types'
import styles from './styles.module.css'

const { TextArea } = Input

export const ScheduleAssistantChat = ({ className }: ScheduleAssistantChatProps) => {
  const { t } = useTranslation('scheduleAssistant')
  const [messages, setMessages] = useState<ScheduleChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [isLoading] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToLatestMessage = useCallback(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToLatestMessage()
  }, [messages, isSending, scrollToLatestMessage])

  useEffect(() => {
    setMessages([createAssistantMessage(t('welcomeMessage'))])
  }, [t])

  const handleSend = useCallback(async () => {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft || isSending || isLoading) {
      return
    }

    const userMessage = createUserMessage(trimmedDraft)
    const nextMessages = [...messages, userMessage]

    setMessages(nextMessages)
    setDraft('')
    setIsSending(true)
    setError(null)

    try {
      const { reply } = await fetchScheduleChatReply(nextMessages)
      setMessages((currentMessages) => [
        ...currentMessages,
        createAssistantMessage(linkifyScheduleEventLinks(reply)),
      ])
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : t('errors.sendFailed'))
      setMessages(messages)
      setDraft(trimmedDraft)
    } finally {
      setIsSending(false)
    }
  }, [draft, isLoading, isSending, messages, t])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        void handleSend()
      }
    },
    [handleSend],
  )

  return (
    <Card className={`${styles.chatCard} ${className ?? ''}`.trim()} title={t('chatTitle')}>
      <div className={styles.messages} aria-live="polite" aria-busy={isLoading || isSending}>
        {isLoading ? (
          <Flex align="center" justify="center" className={styles.loadingRow}>
            <Spin aria-label={t('loading')} />
          </Flex>
        ) : (
          messages.map((message) => {
            const isUser = message.role === 'user'

            return (
              <div
                key={message.id}
                className={`${styles.messageRow} ${
                  isUser ? styles.messageRowUser : styles.messageRowAssistant
                }`}
              >
                <Flex gap={12} align="start">
                  {!isUser ? <Avatar icon={<RobotOutlined />} aria-hidden="true" /> : null}
                  <div
                    className={`${styles.messageBubble} ${
                      isUser ? styles.messageBubbleUser : styles.messageBubbleAssistant
                    }`}
                  >
                    {isUser ? message.content : <MarkdownText content={message.content} />}
                  </div>
                  {isUser ? <Avatar icon={<UserOutlined />} aria-hidden="true" /> : null}
                </Flex>
              </div>
            )
          })
        )}

        {isSending ? (
          <div className={styles.loadingRow}>
            <Spin size="small" aria-label={t('thinking')} />
          </div>
        ) : null}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.composer}>
        {error ? <Alert className={styles.error} type="error" message={error} showIcon /> : null}

        <Flex gap={12} align="end">
          <TextArea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('inputPlaceholder')}
            autoSize={{ minRows: 2, maxRows: 5 }}
            disabled={isLoading || isSending}
            aria-label={t('inputLabel')}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={() => void handleSend()}
            loading={isSending}
            disabled={isLoading || draft.trim().length === 0}
            aria-label={t('send')}
          />
        </Flex>
      </div>
    </Card>
  )
}
