import React, { useEffect } from 'react';
import { useState } from 'react';
import { LockOutlined, SafetyCertificateOutlined , UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col } from 'antd';

import Spinner from './Spinner';

import { useAuth, useAuthMiddleware } from '@src/store/useAuth';
import { useFinish } from '@src/store/useFinish';
import { useForm } from '@src/store/useForm';

import { useGenerateID } from '@src/store/useGenerateID';
import { timeStamp } from '@src/utils/timeStamp';

import { checkEmail } from '@src/utils/validator/Signup/checkEmail';
import { checkPassword } from '@src/utils/validator/Signup/checkPassword';

const Signup: React.FC = () => {

  const [isDisabled, setIsDisabled] = useState(false);
  const { 
    setUserID, // didicated Global State for userID -> 
    name, setName,
    email, setEmail,
    password, setPassword,
    roleID, setRoleID,
    setCreated_At,

  } = useAuth();

  const { setAuthAction } = useAuthMiddleware();
  const { id, setID } = useGenerateID();
  const { finishSubmit, setFinishSubmit } = useFinish();

  const { form, setForm } = useForm();

  const [signupForm] = Form.useForm();

  const onFinish = () => {
    setUserID(id);  // setID here
    setRoleID(1); // set Role ID == student
    setCreated_At(timeStamp()); // store timeStamp

    setID(); // reset ID 
    // if successful setID -> 
    // setUserID(id);  // won't

    setFinishSubmit(true);
    setForm(signupForm);

    // return (
    //   // alert(`
    //   //   UserID: ${id}  // display directly the changed ID
    //   //   RoleID: ${roleID}
    //   //   TimeStamp: ${timeStamp()} // display current Time stamp 
    //   //   Name: ${name}
    //   //   Password: ${password}
    //   //   Email: ${email}

    //   // `)

    // )
    
  };

  return (

    <Row
      justify="center"
      align="middle"
      style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: 12 }}
    >
      <Col
        style={{
          width: 400,
          height: 450,
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          border: '1px solid #f0f0f0',
        }}
      >
        <Form
          form={signupForm}
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
        >
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
            Signup
          </h2>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: 'Input name!' }

            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Name"
              value={name}
              onBlur={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                const regex = /^[A-Za-z\s]+$/;
                if (!regex.test(e.key)) {
                  e.preventDefault();
                }
              }}
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Input email!' },
              { validator: checkEmail }, 
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              value={email}
              onBlur={(e) => {
                setEmail(e.target.value)
              }}
              allowClear
              />
          </Form.Item>

          
          {/* Password */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Input password' },
              { validator: checkPassword}

            ]}
            validateTrigger='onChange'
          >
            <Input.Password
              prefix={<LockOutlined />} 
              placeholder="Password"
              value={password}
              onBlur={(e) => {
                setPassword(e.target.value)
              }}
              allowClear
              />
          </Form.Item>

          <Form.Item
            name="confirm-password"

            // simlutaenous check if password not match
            rules={[
              { required: true, message: 'Confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    setIsDisabled(false);
                    return Promise.resolve();
                    
                  }

                  setIsDisabled(true);
                  return Promise.reject(new Error('Password Does Not Match'));
                 
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<SafetyCertificateOutlined  />} 
              placeholder="Confirm Password"
              value={password}
              onBlur={(e) => {
                setPassword(e.target.value)
              }}
              allowClear
              />
          </Form.Item>

          <Form.Item>
            <Button 
              block 
              type="primary" 
              htmlType="submit"
              style={{ padding: '8px', borderRadius: 4 }}
              disabled={isDisabled}
              onClick={() => setAuthAction('signup')}
            >
              { finishSubmit ? <Spinner /> : 'Submit'}
            </Button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
             <a onClick={() => setAuthAction('login')}
            >Login</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
