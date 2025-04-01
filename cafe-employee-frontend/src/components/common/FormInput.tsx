import { Form, Input } from 'antd'
import { Controller } from 'react-hook-form'

export const FormInput = ({
  name,
  label,
  control,
  rules,
  ...rest
}: {
  name: string
  label: string
  control: any
  rules?: any
  [key: string]: any
}) => (
  <Form.Item label={label}>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          <Input {...field} {...rest} />
          {fieldState.error && (
            <div className="error-text">{fieldState.error.message}</div>
          )}
        </>
      )}
    />
  </Form.Item>
)