import React, { useState } from 'react';
import { BarChartOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

import { useOpen } from '@src/store/useOpen';
import StatsModal from './StatsModal';
const { Meta } = Card;

const StatCard: React.FC = () => {

  const { isStatModal, setStatModal } = useOpen();
  
  return(
    <>
      {/* the StatsModal Opener */}
      { isStatModal ? (
        <StatsModal /> // declare this and only show if true
      ) : (
        <Card
      style={{ width: 300 }}
      hoverable={true}
      type='inner'
      // onClick={() => { alert('clicked Card!')}}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <BarChartOutlined key="more" 
          onClick={ () => {
            setStatModal(true) // trigger open the modal
          }}
        />
        ]}
      >
        <Meta
          avatar={<Avatar>N</Avatar>} // store the first name of person if no picture is available
          title="Card title"
          description="This is the description"
        />
      </Card> // else show this card 
      )
      
    }
      
    </>
  );
}


export default StatCard;