import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner: React.FC = () => (
  <Spin indicator={<LoadingOutlined spin />} size="small" />
);

export default Spinner;