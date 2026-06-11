import { StopOutlined, TeamOutlined } from '@ant-design/icons'
import type { EventInfoIcon } from '@/mock-api/eventDetailTypes'

const CoatCheckIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M8 4h8l1 3h3v2h-1.2l-1.3 11H6.5L5.2 9H4V7h3l1-3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 9h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const EventInfoIconMap: Record<EventInfoIcon, () => JSX.Element> = {
  age: () => <TeamOutlined aria-hidden />,
  noKids: () => <StopOutlined aria-hidden />,
  coatCheck: CoatCheckIcon,
}
