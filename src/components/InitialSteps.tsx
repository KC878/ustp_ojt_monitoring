
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
import { toSmartTitleCase } from '@src/utils/generateTitleCase';

type StepStatusMap = {
  requiredHours: 'wait' | 'process' | 'finish' | 'error';
  school: 'wait' | 'process' | 'finish' | 'error';
};

type IconLoading = {
  hours: boolean;
  school: boolean;
};

interface School {
  schoolID: string;
  schoolName: string;
}

interface Props {
  schools: School[];
  schoolsLoading: boolean;
}
const { Text } = Typography;


// component
const InitialSteps: React.FC<Props>= ( { schools, schoolsLoading }) => {
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


  const [isSelect, setIsSelect] = useState(true);
  const [disabledStatus, setDisabledStatus] = useState(true);


  const {
    numValue, setNumValue,
    schoolID, setSchoolID,
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
                  <Text style={{ display: 'block' }}>Required Hours: <b>{numValue}</b></Text>
                  <Text style={{ display: 'block' }}>School ID: <b>{schoolID}</b></Text>
                  <Text style={{ display: 'block' }}>School Name: <b>{schoolValue}s</b></Text>
                </div>
                <div style={{marginTop: '10px'}}> 
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
          initialValues={{
            schoolId: '',
            school: schoolValue,
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {isSelect ? (
              <>
                {/* School Name - SELECT dropdown */}
                <Form.Item
                  label="School Name"
                  name="school"
                  rules={[{ required: true, message: 'Please select your school name!' }]}
                  style={{ flex: 2 }}
                >
                  <Select
                    labelInValue={true}
                    style={{ fontSize: 18, width: '100%' }}
                    loading={schoolsLoading}
                    placeholder="Select your school"
                    value={
                      schoolID && schoolValue
                        ? { value: schoolID, label: schoolValue }
                        : undefined
                    }
                    onChange={(selectedSchool) => {
                      setSchoolID(selectedSchool.value);  // Access value (schoolID)
                      setSchoolValue(selectedSchool.label);  // Access label (schoolName)

                      form.setFieldsValue({
                        school: selectedSchool.label,  // Updates the form field for 'school'
                        schoolId: selectedSchool.value,  // Use schoolID here if needed elsewhere
                      });
                    }}
                  >
                    {schools?.map((school) => (
                      <Select.Option key={school.schoolID} value={school.schoolID}>
                        {school.schoolName}
                      </Select.Option>
                    ))}
                  </Select>



                </Form.Item>
              </>
            ) : (
              <>
                {/* Manual Input Mode */}
                
                <Form.Item
                  label="School ID (Acronym)"
                  name="schoolId"
                  rules={[
                    { required: true, message: 'Please enter your school ID (acronym)!' },
                    { max: 10, message: 'Max 10 characters only!' },
                  ]}
                  style={{ flex: 1 }}
                  
                >
                  <Input
                    placeholder="e.g. USTP"
                    style={{
                      fontSize: 18,
                      padding: '10px 15px',
                      textTransform: 'uppercase',
                    }}
                    onChange={(e) =>
                      setSchoolID(e.target.value.toUpperCase(),) // value schoolID
                    }
                  />
                </Form.Item>
        
                <Form.Item
                  label="School Name"
                  name="school"
                  rules={[{ required: true, message: 'Please enter your school name!' }]}
                  style={{ flex: 2 }}
                >
                  <Input
                    placeholder="e.g. ABC University"
                    style={{
                      fontSize: 18,
                      padding: '10px 15px',
                    }}
                    value={schoolValue}
                    onChange={(e) => {
                      const upperName = e.target.value;
                      const titleSchoolName = toSmartTitleCase(upperName);


                      setSchoolValue(titleSchoolName);
                    }}
                  />
                </Form.Item>
              </>
            )}
          </div>
        
          {/* Toggle Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}>
            <Button
              type="link"
              onClick={handleSelectChange}
              style={{ fontSize: 14, padding: 10, marginBottom: '10px'}}
            >
              {isSelect ? 'Register School' : 'Select School'}
            </Button>
          </div>
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
                  form.submit(); // next
                } else if (status.school === 'process') {
                  form.submit(); // next 
                  handleFinish()
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
