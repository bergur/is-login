const certToPem = function (cert) {
  let pem = cert.match(/.{1,64}/g).join('\n')

  if (!cert.includes('-BEGIN CERTIFICATE-')) {
    pem = '-----BEGIN CERTIFICATE-----\n' + pem
  }

  if (!cert.includes('-END CERTIFICATE-')) {
    pem = pem + '\n-----END CERTIFICATE-----'
  }

  return pem
}

module.exports = certToPem
