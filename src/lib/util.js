import aes from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

export function getQuery() {
  let params = {};
  window.location.search.slice(1).split('&').forEach(s => {
    if (s === '') {
      return false;
    }
    const tmp = s.split('=');
    params[tmp[0]] = tmp[1];
  });
  return params;
}

export function decryptAuthState(state, iv) {
  return aes.decrypt(decodeURIComponent(state), iv).toString(enc);
}

export function encryptAuthState(key, iv) {
  return aes.encrypt(key, iv).toString();
}
