import React from 'react';
import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

import { useAuth, useAuthMiddleware } from '@src/store/useAuth';


const Login: React.FC = () => {
  const { 
    name, setName, 
    password, setPassword
  } = useAuth();

  const { setAuthAction } = useAuthMiddleware();

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
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
        >
          <h2 style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
            Welcome Back!
          </h2>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input 
              prefix={<LockOutlined />} 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              />
          </Form.Item>

          <Form.Item>
            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <a href="">Forgot password</a>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button 
              block 
              type="primary" 
              htmlType="submit" 
              style={{ padding: '8px', borderRadius: 4 }}
            >
              Log in
            </Button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              No account? <a onClick={() => setAuthAction('signup')}>Register now!</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
