import StringCrypto from 'string-crypto';

const {
    encryptString,
    decryptString,
} = new StringCrypto();

export const cryptoEncrypt = (token, key) => {
    return encryptString(token, key);
}

export const cryptoDecrypt = (token, key) => {
    return decryptString(token, key)
}

