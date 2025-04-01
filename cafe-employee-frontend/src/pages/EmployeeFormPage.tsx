import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Radio, Select, message } from 'antd'
import { FormInput } from '../components/common/FormInput'
import { useEmployeeForm } from '../hooks/useEmployeeForm'

const schema = yup.object().shape({
  name: yup.string().min(6).max(10).required(),
  email_address: yup.string().email().required(),
  phone_number: yup.string().matches(/^[89]\d{7}$/).required(),
  gender: yup.string().oneOf(['Male', 'Female']).required(),
  cafe_id: yup.string().nullable()
})

export default function EmployeeFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { control, handleSubmit, cafes } = useEmployeeForm(id, schema)

  const onSubmit = async (data: any) => {
    try {
      // Call API to save employee
      message.success('Employee saved successfully')
      navigate('/employees')
    } catch (error) {
      message.error('Failed to save employee')
    }
  }

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <FormInput name="name" label="Name" control={control} />
        <FormInput name="email_address" label="Email" control={control} />
        <FormInput name="phone_number" label="Phone" control={control} />
        
        <Form.Item label="Gender">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            )}
          />
        </Form.Item>

        <Form.Item label="Assigned Cafe">
          <Controller
            name="cafe_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={cafes?.map(cafe => ({
                  label: cafe.name,
                  value: cafe.id
                }))}
                allowClear
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form>
    </div>
  )
}