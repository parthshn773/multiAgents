import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal

export const showDeleteConfirm = (onConfirm: () => void) => {
  confirm({
    title: 'Are you sure you want to delete?',
    icon: <ExclamationCircleFilled />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onConfirm()
    }
  })
}