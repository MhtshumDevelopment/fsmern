import  MD5  from 'md5.js';

export const hashString = (string) => {
  return new MD5().update(string).digest('hex');
};