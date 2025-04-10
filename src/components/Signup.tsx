import React from 'react';
import { useState } from 'react';
import { LockOutlined, SafetyCertificateOutlined , UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

import { useAuth } from '@src/store/useAuth';


const Signup: React.FC = () => {
  const { 
    authAction, setAuthAction,
    userID, setUserID,
    name, setName,
    email, setEmail,
    password, setPassword,
    roleID, setRoleID,
    created_at, setCreated_At
  } = useAuth();
  

  const onFinish = (values: any) => {
    alert(`
      Name: ${name}
      Password: ${password}  
    `);
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
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              />
          </Form.Item>

          
          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input 
              type='password'
              prefix={<LockOutlined />} 
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              />
          </Form.Item>

          <Form.Item
            name="confirm-password"

            // simlutaenous check if password not match
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input 
              type='password'
              prefix={<SafetyCertificateOutlined  />} 
              placeholder="Confirm Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              />
          </Form.Item>

          <Form.Item>
            <Button 
              block 
              type="primary" 
              htmlType="submit"
              style={{ padding: '8px', borderRadius: 4 }}
            >
              Signup
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
