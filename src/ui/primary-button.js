import React from 'react'
import { Button } from 'antd'

export const PrimaryButton = ({ disabled, children, onClick, loading }) => (
  <Button
    loading={loading}
    type="primary"
    size="large"
    htmlType="submit"
    className="login-form-button"
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </Button>
)
