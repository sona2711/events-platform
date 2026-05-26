import { Typography } from 'antd'

interface HelloWorldProps {
  message: string
}

export function HelloWorld({ message }: HelloWorldProps) {
  return <Typography.Text>{message}</Typography.Text>
}
