const assert = require('assert').strict
const { parseStringPromise } = require('xml2js')
const certToPem = require('./lib/certToPem')
const verifyCert = require('./lib/verifyCert')
const verifyXMLSignature = require('./lib/verifyXMLSignature')
const verifyMessage = require('./lib/verifyMessage')
const getUser = require('./lib/getUser')

const makeLogin = function ({
  authorityPem,
  audience,
  callbackUrl
}) {
  return async (token) => {
    assert(authorityPem, 'Authority certificate required')
    assert(audience, 'Audience required')
    assert(callbackUrl, 'Callback URL required')

    const xmlString = Buffer.from(token, 'base64').toString('utf-8')
    const xmlObj = await parseStringPromise(xmlString, { explicitArray: false })

    const certFromXML = xmlObj.Response.Signature.KeyInfo.X509Data.X509Certificate
    const clientPem = certToPem(certFromXML)

    const attributesFromXML = xmlObj.Response.Assertion.AttributeStatement.Attribute
    const user = getUser(attributesFromXML)

    const assertionsFromXML = {
      issuer: xmlObj.Response.Assertion.Issuer,
      notBefore: xmlObj.Response.Assertion.Conditions.$.NotBefore,
      notOnOrAfter: xmlObj.Response.Assertion.Conditions.$.NotOnOrAfter,
      audience: xmlObj.Response.Assertion.Conditions.AudienceRestriction.Audience,
      destination: xmlObj.Response.$.Destination,
    }

    verifyCert(clientPem, authorityPem)
    // verifyXMLSignature(xmlString)
    verifyMessage(assertionsFromXML, audience, callbackUrl)

    return user
  }
}

module.exports = makeLogin
