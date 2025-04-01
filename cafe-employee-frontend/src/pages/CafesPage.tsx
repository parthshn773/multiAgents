import { useState } from 'react'
import { useQuery } from 'react-query'
import { Button, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import { fetchCafes } from '../services/cafeService'
import { showDeleteConfirm } from '../components/common/ConfirmModal'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

export default function CafesPage() {
  const [locationFilter, setLocationFilter] = useState('')
  const { data: cafes, isLoading } = useQuery(
    ['cafes', locationFilter], 
    () => fetchCafes(locationFilter)
  )
  const navigate = useNavigate()

  const columnDefs = [
    { headerName: 'Logo', field: 'logo', cellRenderer: (params: any) => 
      params.value && <img src={params.value} width="50" alt="logo" /> },
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Employees', field: 'employees', width: 120 },
    { headerName: 'Location', field: 'location', filter: true },
    { 
      headerName: 'Actions', 
      cellRenderer: (params: any) => (
        <Space>
          <Button onClick={() => navigate(`/cafes/edit/${params.data.id}`)}>Edit</Button>
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
          placeholder="Filter by location"
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/cafes/new')}>
          Add New Cafe
        </Button>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
          rowData={cafes || []}
          columnDefs={columnDefs}
          loadingOverlayComponentParams={{ loadingMessage: 'Loading cafes...' }}
          loading={isLoading}
        />
      </div>
    </div>
  )
}