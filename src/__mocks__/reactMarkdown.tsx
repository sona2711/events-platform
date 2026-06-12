import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ReactMarkdownProps = {
  children: string
}

const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = []
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null = linkPattern.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(...renderBoldText(text.slice(lastIndex, match.index)))
    }

    const [, label, href] = match

    if (href.startsWith('/')) {
      nodes.push(
        <Link key={`${href}-${match.index}`} to={href}>
          {renderBoldText(label)}
        </Link>,
      )
    } else {
      nodes.push(
        <a key={`${href}-${match.index}`} href={href}>
          {renderBoldText(label)}
        </a>,
      )
    }

    lastIndex = match.index + match[0].length
    match = linkPattern.exec(text)
  }

  if (lastIndex < text.length) {
    nodes.push(...renderBoldText(text.slice(lastIndex)))
  }

  return nodes
}

const renderBoldText = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    return part
  })

export default function ReactMarkdown({ children }: ReactMarkdownProps) {
  const blocks = children.trim().split(/\n\n+/)

  return (
    <div>
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n')

        if (lines.every((line) => line.startsWith('* '))) {
          return (
            <ul key={blockIndex}>
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line.slice(2))}</li>
              ))}
            </ul>
          )
        }

        return <p key={blockIndex}>{renderInline(block)}</p>
      })}
    </div>
  )
}
