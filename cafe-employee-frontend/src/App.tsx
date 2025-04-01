import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import CafesPage from './pages/CafesPage'
import EmployeesPage from './pages/EmployeesPage' // Now this exists
import CafeFormPage from './pages/CafeFormPage'
import EmployeeFormPage from './pages/EmployeeFormPage'
import './styles/main.css'

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00a96e' }}}>
      <AntdApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CafesPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            {/* Other routes */}
          </Routes>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App