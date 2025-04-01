import api from './api'
import { message } from 'antd'

export const fetchEmployees = async (cafe?: string) => {
  try {
    const response = await api.get('/employees', { params: { cafe } })
    return response.data
  } catch (error) {
    message.error('Failed to fetch employees')
    throw error
  }
}

export const createEmployee = async (data: any) => {
  try {
    const response = await api.post('/employee', data)
    message.success('Employee created successfully')
    return response.data
  } catch (error) {
    message.error('Failed to create employee')
    throw error
  }
}