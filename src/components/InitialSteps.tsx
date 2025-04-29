
import React, { useState, useEffect } from 'react';
import {
  CheckCircleOutlined,
  LoadingOutlined,
  ClockCircleOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Steps, Modal, Button, Input, Form, Select, Result, Typography } from 'antd';
import { useAuth } from '@src/store/useAuth';
import { useRouter } from 'next/navigation';
import { useFinish } from '@src/store/useFinish';

type StepStatusMap = {
  requiredHours: 'wait' | 'process' | 'finish' | 'error';
  school: 'wait' | 'process' | 'finish' | 'error';
};

type IconLoading = {
  hours: boolean;
  school: boolean;
};

const { Text } = Typography;


// component
const InitialSteps: React.FC = () => {
  const router = useRouter();
  const { setFinishInitial } = useFinish();
  const [pushLoad, setPushLoad] = useState(false);  

  const [status, setStatus] = useState<StepStatusMap>({
    requiredHours: 'process',
    school: 'wait',
  });

  const [iconLoading, setIconLoading] = useState<IconLoading>({
    hours: true,
    school: false,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm();


  const [isSelect, setIsSelect] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(true);


  const {
    numValue, setNumValue,
    schoolValue, setSchoolValue,
    setFirstLogin,
  } = useAuth();


  const [finish, setFinish] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleFinish = () => {  
    setLoading(true);
    setTimeout(() => {
      setFinish(true);
      setStatus({
        requiredHours: 'finish',
        school: 'finish',
      });
    }, 3000); 
    setFinishInitial(true);
  };

  const handleSchoolSubmit = () => {
    if (!schoolValue.trim()) {
      return;
    }

    handleFinish(); // Complete the process
  };

  const handleNext = () => {
    setStatus(prev => ({
      ...prev,
      requiredHours: 'finish',
      school: 'process',
    }));

    setIconLoading({
      hours: false,
      school: true,
    });
    setDisabledStatus(false);
  };

  const handlePrev = () => {
    if (status.school === 'process') {
      setStatus({
        requiredHours: 'process',
        school: 'wait',
      });

      setIconLoading({
        hours: true,
        school: false,
      });
      setDisabledStatus(true);
    }
  };

  const handleSelectChange = () => {
    setIsSelect(!isSelect);
    setSchoolValue(''); // Clear value when switching
  };



  //// mount and open the modal here
  useEffect(() => {
    setOpen(true);
  }, [])

  return (
    
    <> 
      <Modal
        open={open}
        footer={null}
        centered
        width={600}
        closable={false}
        maskClosable={false}
      >
        <Steps
          direction="horizontal"
          size="small"
          style={{ marginTop: '20px' }}
          current={Object.values(status).indexOf('process')}
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <CheckCircleOutlined />,
            },
            {
              title: 'Required Hours',
              status: status.requiredHours,
              icon:
                status.requiredHours === 'finish' ? (
                  <CheckCircleOutlined />
                ) : iconLoading.hours ? (
                  <LoadingOutlined />
                ) : (
                  <ClockCircleOutlined />
                ),
            },
            {
              title: 'School',
              status: status.school,
              icon:
                status.school === 'finish' ? (
                  <CheckCircleOutlined />
                ) : iconLoading.school ? (
                  <LoadingOutlined />
                ) : (
                  <BookOutlined />
                ),
            },
          ]}
        />

        {/* Show Result after finish */}
        {finish ? (
          <Result
            status="success"
            title="Successfully Completed!"
            subTitle="Your required hours and school have been successfully recorded."
            extra={[
              <div key={'container-result'}> 
                <div>
                  <Text>Required Hours: {numValue}</Text>
                </div>
                <div> 
                  <Text>School: {schoolValue}</Text>
                </div>
                <div> 
                  <Button type="primary" key="console" loading={pushLoad} onClick={() => {
                      setPushLoad(true);
                      setFirstLogin(false)
                      router.push('/pages/dashboard');
                    }}>
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            ]}
          />
        ) : (
          // Show form for Required Hours if not finished yet
          status.requiredHours === 'process' && status.school === 'wait' && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleNext}
              style={{ marginTop: 20 }}
            >
              <Form.Item
                label="Enter Required Hours"
                name="requiredHours"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the required hours!',
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: 'Only numbers are allowed!',
                  },
                ]}
              >
                <Input
                  style={{
                    fontSize: 24,
                    padding: '10px 15px',
                    width: '100%',
                  }}
                  value={numValue}
                  onChange={e => setNumValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'e' || e.key === 'E') {
                      e.preventDefault();
                    }
                  }}
                  placeholder="e.g. 40"
                  type="number"
                />
              </Form.Item>
            </Form>
          )
        )}

        {/* Form for School if Required Hours are finished */}
        {status.school === 'process' && status.requiredHours === 'finish' && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSchoolSubmit}
            style={{ marginTop: 20 }}
          >
            <Form.Item
              label="Enter School Name"
              name="school"
              rules={[
                {
                  required: true,
                  message: 'Please enter your school name!',
                },
              ]}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {isSelect ? (
                  <Select
                    style={{
                      fontSize: 24,
                      width: '100%',
                    }}
                    placeholder="Select your school"
                    value={schoolValue || undefined}
                    onChange={value => setSchoolValue(value)}
                  >
                    <Select.Option value="ABC University">
                      ABC University
                    </Select.Option>
                    <Select.Option value="XYZ University">
                      XYZ University
                    </Select.Option>
                  </Select>
                ) : (
                  <Input
                    style={{
                      fontSize: 24,
                      padding: '10px 15px',
                      width: '100%',
                      textTransform: 'uppercase',
                    }}
                    placeholder="Ex: ABC University"
                    value={schoolValue}
                    onChange={e => setSchoolValue(e.target.value.toUpperCase())}
                    autoFocus // focus field after next
                  />
                )}

                <Button
                  type="link"
                  onClick={handleSelectChange}
                  style={{
                    marginTop: '10px',
                    fontSize: 16,
                    textAlign: 'right',
                    alignSelf: 'flex-end',
                  }}
                >
                  Switch to {isSelect ? 'Input' : 'Select'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}

        {/* Buttons */}

        {!finish && 
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="default"
              disabled={disabledStatus}
              onClick={handlePrev}
              block
              style={{
                width: '45%',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Previous
            </Button>

            <Button
              type="primary"
              onClick={() => {
                if (status.requiredHours === 'process') {
                  form.submit();
                } else if (status.school === 'process') {
                  form.submit();
                }
              }}
              block
              style={{
                width: '45%',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
              loading={loading}
            >
              {status.requiredHours === 'process' ? 'Next' : 'Submit'}
            </Button>
          </div>
        }
        
      </Modal>
    </>
  );
};

export default InitialSteps;
