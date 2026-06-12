import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import type { MarkdownTextProps } from './types'
import styles from './styles.module.css'

export const MarkdownText = ({ content, className }: MarkdownTextProps) => (
  <div className={`${styles.markdown} ${className ?? ''}`.trim()}>
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith('/')) {
            return (
              <Link className={styles.internalLink} to={href}>
                {children}
              </Link>
            )
          }

          return (
            <a className={styles.externalLink} href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
)
