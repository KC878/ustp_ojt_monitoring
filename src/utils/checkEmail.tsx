import { postData } from '@src/services/usePostData'
import { messages } from '@src/utils/messages';
import { RuleObject } from 'antd/es/form';


export const checkEmail: (_: RuleObject, value: string) => Promise<void> = async (
  _,
  email
)  => {
  const response = await postData(
    '/api/VALIDATOR/checkEmailExist',
    ['email'],
    [email]
  );

  if (response.status === 500) {
    return Promise.reject(new Error(messages.ERROR.EMAIL_EXIST));
  }

  return Promise.resolve();
};