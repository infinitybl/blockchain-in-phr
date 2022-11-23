import CryptoJS from "crypto-js";

const AESKey = "aers"; // Store the key in an environment variable if deploying website to production

const encrypt = (string) => {
  const parsedString = CryptoJS.enc.Utf8.parse(
    CryptoJS.AES.encrypt(JSON.stringify(string), AESKey).toString()
  );
  const encryptedString = CryptoJS.enc.Base64.stringify(parsedString);
  return encryptedString;
};

const decrypt = (encryptedString) => {
  const parsedString = CryptoJS.enc.Base64.parse(encryptedString);
  const decodedString = CryptoJS.enc.Utf8.stringify(parsedString).toString();
  return CryptoJS.AES.decrypt(decodedString, AESKey)
    .toString(CryptoJS.enc.Utf8)
    .replace(/^"(.+(?="$))"$/, "$1");
};

export { encrypt, decrypt };
