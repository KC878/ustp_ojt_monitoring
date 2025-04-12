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

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // for gmail format

  if (response.status === 200 && response.message === messages.AUTH.EMAIL_EXIST) {
    return Promise.reject(new Error(messages.AUTH.EMAIL_EXIST));
  }else if(!gmailRegex.test(email)){
    return Promise.reject(new Error(messages.AUTH.EMAIL_FORMAT))
  }

  return Promise.resolve();
};