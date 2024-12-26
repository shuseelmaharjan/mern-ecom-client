import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

if (!SECRET_KEY) {
  console.error('Encryption secret key is not defined in the environment variables.');
}

const useEncryption = () => {
  const encrypt = useCallback((data) => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  }, []);

  const decrypt = useCallback((encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }, []);

  return { encrypt, decrypt };
};

export default useEncryption;
