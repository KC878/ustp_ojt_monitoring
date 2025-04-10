import React, { useEffect, useState } from 'react';
import {
  LockOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row, Col } from 'antd';
import { useAuth } from '@src/store/useAuth';

const Signup: React.FC = () => {
  const {
    authAction, setAuthAction,
    name, setName,
    email, setEmail,
    password, setPassword,
  } = useAuth();

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const onFinish = () => {
    alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  };

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(null); // No indication if one is empty
    }
  }, [password, confirmPassword]);

  const renderMatchIcon = () => {
    if (passwordMatch === null) return null;
    return (
      <span
        style={{
          marginLeft: 8,
          color: passwordMatch ? 'green' : 'red',
          fontWeight: 'bold',
        }}
      >
        {passwordMatch ? '✔' : 'X'}
      </span>
    );
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
          layout="vertical"
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 24,
            }}
          >
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1 }}
              />
              {password && renderMatchIcon()}
            </div>
          </Form.Item>

          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input.Password
                prefix={<SafetyCertificateOutlined />}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ flex: 1 }}
              />
              {confirmPassword && renderMatchIcon()}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ padding: '8px', borderRadius: 4 }}
              disabled={passwordMatch !== true}
            >
              Signup
            </Button>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <a onClick={() => setAuthAction('login')}>Login</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Signup;
