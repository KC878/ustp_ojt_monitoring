
import React from 'react';
import {
  Card,
  Collapse,
  Skeleton,
  Space,
  Progress,
} from 'antd';
import {
  FilePdfOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const CardSkeleton: React.FC = () => {
  return (
    <Card
      style={{ width: 600, marginBottom: 16 }}
      actions={[
        <FilePdfOutlined key="pdf" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Skeleton avatar paragraph={{ rows: 1 }} active />

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Skeleton.Input style={{ width: 200 }} active size="small" />
        <Skeleton.Input style={{ width: 300 }} active size="small" />
        <Skeleton.Input style={{ width: 100 }} active size="small" />
        <Progress percent={0} showInfo={false} />
      </Space>

      <Collapse defaultActiveKey={[]} ghost style={{ marginTop: 16 }}>
        <Collapse.Panel header={<Skeleton.Input style={{ width: 150 }} active size="small" />} key="1">
          <Skeleton
            title={false}
            paragraph={{ rows: 4, width: ['100%', '100%', '100%', '100%'] }}
            active
          />
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};

export default CardSkeleton;
