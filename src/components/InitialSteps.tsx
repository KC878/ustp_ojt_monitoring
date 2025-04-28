import React, { useState } from 'react';
import {
  UserOutlined, LoadingOutlined,
  SmileOutlined, ClockCircleOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Steps, StepProps, Modal, Button, Input, Form, Select } from 'antd';

type StepStatusMap = {
  requiredHours: StepProps['status'];
  school: StepProps['status'];
  done: StepProps['status'];
};

type IconLoading = {
  hours: boolean;
  school: boolean;
};

const InitialSteps: React.FC = () => {
  const [status, setStatus] = useState<StepStatusMap>({
    requiredHours: 'process',
    school: 'wait',
    done: 'wait',
  });

  const [iconLoading, setIconLoading] = useState<IconLoading>({
    hours: true,
    school: false,
  });

  const [open, setOpen] = useState<boolean>(false); // Modal state
  const [form] = Form.useForm(); // Ant Design Form hook for the fields

  const [formData, setFormData] = useState({
    requiredHours: '',
    school: '',
  });

  const [isSelect, setIsSelect] = useState(false); // State to toggle Input or Select

  // Handle form submission for "Required Hours"
  const handleFinish = (values: any) => {
    console.log('Required Hours:', values.requiredHours); // Handle the required hours value
    setFormData(prev => ({
      ...prev,
      requiredHours: values.requiredHours,
    }));
    setStatus(prev => ({
      ...prev,
      requiredHours: 'finish', // Mark as complete after form submission
      school: 'process', // Move to the next step
    }));
  };

  // Handle form submission for "School"
  const handleSchoolSubmit = (values: any) => {
    console.log('School Name:', values.school); // Handle the school value
    setFormData(prev => ({
      ...prev,
      school: values.school,
    }));
    setStatus(prev => ({
      ...prev,
      school: 'finish', // Mark as complete after school form submission
      done: 'process', // Move to the done step
    }));
  };

  // Handle Next step
  const handleNext = () => {
    if (status.requiredHours === 'finish') {
      setStatus(prev => ({
        ...prev,
        school: 'process', // Move to "School" step
      }));
    } else if (status.school === 'finish') {
      setStatus(prev => ({
        ...prev,
        done: 'finish', // Complete the flow
      }));
    } // logic here for next and prev
  };

  // Handle Previous step
  const handlePrev = () => {
    if (status.school === 'process') {
      setStatus(prev => ({
        ...prev,
        requiredHours: 'process', // Go back to "Required Hours"
        school: 'wait',
      }));
    } else if (status.done === 'process') {
      setStatus(prev => ({
        ...prev,
        school: 'finish', // Go back to "School"
        done: 'wait',
      }));
    }
  };

  // Trigger to show the Select field (this can be toggled by some logic)
  const handleSelectChange = () => {
    setIsSelect(!isSelect); // Toggle between Input and Select
  };

  return (
    <>
      {/* Button to Open Modal */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Steps Modal
      </Button>

      {/* Centered Modal */}
      <Modal
        open={open}
        onCancel={() => {}}
        footer={null}
        centered
        width={600} // Adjust the modal width
        closable={false}
        maskClosable={false} // Prevent closing the modal when clicking outside
      >
        {/* Steps Displayed Horizontally */}
        <Steps
          direction="horizontal"
          size="small"
          style={{ marginTop: '20px' }}
          current={Object.values(status).indexOf('process')}
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Required Hours',
              status: status.requiredHours,
              icon: iconLoading.hours ? <LoadingOutlined /> : <ClockCircleOutlined />,
            },
            {
              title: 'School',
              status: status.school,
              icon: iconLoading.school ? <LoadingOutlined /> : <BookOutlined />,
            },
            {
              title: 'Done',
              status: status.done,
              icon: <SmileOutlined />,
            },
          ]}
        />

        {/* Form for "Required Hours" */}
        {status.requiredHours === 'process' && (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
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
                placeholder="e.g. 40"
                type="number"
              />
            </Form.Item>

            <Form.Item>
              {/* Add Next and Previous Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="default"
                  onClick={handlePrev}
                  block
                  style={{
                    width: '45%', // Make it leftmost
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Previous
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: '45%', // Make it rightmost
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}
                >
                  Next
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}

        {/* Form for "School" */}
        {status.school === 'process' && (
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
                {/* Select or Input Field */}
                {isSelect ? (
                  <Select
                    style={{
                      fontSize: 24,
                      width: '100%',
                    }}
                    placeholder="Select your school"
                  >
                    <Select.Option value="abc_university">ABC University</Select.Option>
                    <Select.Option value="xyz_university">XYZ University</Select.Option>
                    {/* Add more options as needed */}
                  </Select>
                ) : (
                  <Input
                    style={{
                      fontSize: 24,
                      padding: '10px 15px',
                      width: '100%',
                    }}
                    placeholder="Ex: ABC University"
                  />
                )}

                {/* Switch button below the Select/Input and aligned to the right */}
                <Button
                  type="link"
                  onClick={handleSelectChange}
                  style={{
                    marginTop: '10px', // Space between the input/select and the button
                    fontSize: 16,
                    textAlign: 'right',
                    alignSelf: 'flex-end', // Aligns the button to the right side
                  }}
                >
                  Switch to {isSelect ? 'Input' : 'Select'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}

        {/* Buttons below the form (Next/Previous) */}
        {(status.requiredHours === 'finish' || status.school === 'finish') && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="default"
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
              onClick={handleNext}
              block
              style={{
                width: '45%',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {status.done === 'finish' ? 'Submit' : 'Next'}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default InitialSteps;
