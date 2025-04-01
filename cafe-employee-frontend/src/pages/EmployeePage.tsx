import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import { fetchEmployees } from '../services/employeeService'
import { showDeleteConfirm } from '../components/common/ConfirmModal'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function EmployeesPage() {
  const [cafeFilter, setCafeFilter] = useState('')
  const { data: employees, isLoading } = useQuery(
    ['employees', cafeFilter], 
    () => fetchEmployees(cafeFilter)
  )
  const navigate = useNavigate()

  const columnDefs = [
    { headerName: 'ID', field: 'id', width: 120 },
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Email', field: 'email_address' },
    { headerName: 'Phone', field: 'phone_number' },
    { headerName: 'Days Worked', field: 'days_worked', width: 120 },
    { headerName: 'Cafe', field: 'cafe' },
    { 
      headerName: 'Actions', 
      cellRenderer: (params: any) => (
        <Space>
          <Button onClick={() => navigate(`/employees/edit/${params.data.id}`)}>Edit</Button>
          <Button danger onClick={() => showDeleteConfirm(() => handleDelete(params.data.id))}>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <Input.Search
          placeholder="Filter by cafe"
          onChange={(e) => setCafeFilter(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/employees/new')}>
          Add New Employee
        </Button>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
          rowData={employees || []}
          columnDefs={columnDefs}
          loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
          loading={isLoading}
        />
      </div>
    </div>
  )
}