import { BrowserRouter } from 'react-router-dom'
import { Typography } from 'antd'

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 24 }}>
        <Typography.Title>Events Platform</Typography.Title>
      </div>
    </BrowserRouter>
  )
}

export default App
