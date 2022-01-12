/*
  Verifies that information in the xml document (saml message)
  is correct. refDate is only used for testing.
*/

const verifyMessage = function (assertion, audience, callbackUrl, refDate) {
  const THJODSKRA_NAME = 'Þjóðskrá Íslands'

  if (assertion.issuer !== THJODSKRA_NAME) {
    throw new Error('Issuer in message is not ' +  THJODSKRA_NAME)
  }
  
  if (assertion.audience !== audience) {
    throw new Error('Audience in message and given audience does not match')
  }

  if (assertion.destination !== callbackUrl) {
    throw new Error('Destination in message and callback url do not match')
  }

  const now = refDate ? new Date(refDate) : new Date() // Used for testing for fake now
  if (now < assertion.notBefore || now >= assertion.notOnOrAfter) {
    throw new Error('Message not yet valid or expired')
  }

  return true
}

module.exports = verifyMessage
