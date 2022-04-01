// import config from 'config';
import jwt from 'jsonwebtoken';

// const publicKey = Buffer.from(
//   config.get<string>('publicKey'),
//   'base64'
// ).toString('ascii');
// const privateKey = Buffer.from(
//   config.get<string>('privateKey'),
//   'base64'
// ).toString('ascii');

export function signJwt(object: Object) {
  return jwt.sign(object, 'shhhhh');
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, 'shhhhh') as T;
    return decoded;
  } catch (err) {
    return null;
  }
}
