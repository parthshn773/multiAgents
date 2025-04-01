import api from './api'
import { message } from 'antd'

export const fetchCafes = async (location?: string) => {
  try {
    const response = await api.get('/cafes', { params: { location } })
    return response.data
  } catch (error) {
    message.error('Failed to fetch cafes')
    throw error
  }
}

export const createCafe = async (data: FormData) => {
  try {
    const response = await api.post('/cafe', data)
    message.success('Cafe created successfully')
    return response.data
  } catch (error) {
    message.error('Failed to create cafe')
    throw error
  }
}