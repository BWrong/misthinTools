const crypto = require('crypto');
function encryption(data,key) {
  var iv = '123456';
  var clearEncoding = 'utf8';
  var cipherEncoding = 'base64';
  var cipherChunks = [];
  var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
  cipher.setAutoPadding(true);
  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
  cipherChunks.push(cipher.final(cipherEncoding));
  return cipherChunks.join('');
}

function decryption(data,key){
  var iv = '123456';
  var clearEncoding = 'utf8';
  var cipherEncoding = 'base64';
  var cipherChunks = [];
  var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
  decipher.setAutoPadding(true);
  cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
  cipherChunks.push(decipher.final(clearEncoding));
  console.log( cipherChunks.join(''));
}
let result = encryption('123', '111');
console.log(result);
console.log(decryption(result,'111'));