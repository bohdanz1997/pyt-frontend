import React from 'react'
import { Typography } from 'antd'

const { Title, Text, Paragraph } = Typography

export const H1 = (props) => <Title level={1} {...props} />
export const H2 = (props) => <Title level={2} {...props} />
export const H3 = (props) => <Title level={3} {...props} />
export const H4 = (props) => <Title level={4} {...props} />

export { Text, Paragraph }
