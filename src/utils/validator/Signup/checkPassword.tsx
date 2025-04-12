
import { messages } from '@src/utils/messages';
import { RuleObject } from 'antd/es/form';


export const checkPassword: (_: RuleObject, value: string) => Promise<void> = async (
  _,
  password
)  => {

  if (password !== undefined && password.length < 8) {
    return Promise.reject(new Error(messages.AUTH.PASSWORD_LENGTH));
  }

  return Promise.resolve();
};