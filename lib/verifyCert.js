/*
  Validates the certificate based on island.is requirements
  See: http://assets.ctfassets.net/8k0h54kbe6bj/4oWMbNfUQMxseUiu3bgk7D/673d6c249b03277c31590c0c31d6f05e/innskraning-island-is-leidbeiningar-utg-2-0.619.pdf
*/

const { pki } = require('node-forge')

const verifyCert = function (clientPem, authorityPem) {
  const clientCert = pki.certificateFromPem(clientPem)
  const authorityCert = pki.certificateFromPem(authorityPem)

  // Skilríki er í eigu Þjóðskráar
  const THJODSKRA_SERIAL = '6503760649'
  const serialNumber = clientCert.subject.attributes.find(att => att.name === 'serialNumber')?.value
  const validSerialNumber = serialNumber && serialNumber === THJODSKRA_SERIAL

  if (!validSerialNumber) {
    throw new Error('Invalid serial number in certificate subject')
  }

  if (!authorityCert.verify(clientCert)) {
    throw new Error('Invalid certificate signature')
  }

  if (!clientCert.isIssuer(authorityCert)) {
    throw new Error('Invalid certificate issuer')
  }

  const now = new Date()
  const validDate = !(now < clientCert.validity.notBefore || now > clientCert.validity.notAfter)

  if (!validDate) {
    // throw new Error('Certificate not yet valid or expired')
  }

  if (!clientCert.verifySubjectKeyIdentifier()) {
    throw new Error('Invalid SubjectKeyIdentifier')
  }

  const validExtensions = clientCert.extensions
    .filter((ext) => ext.name !== 'basicConstraints') // Allow basicConstraints extension
    .reduce((total, current) => total + current.critical, 0) === 0

  if (!validExtensions) {
    throw new Error('Certificate contains critical extension')
  }

  return true
}

module.exports = verifyCert
