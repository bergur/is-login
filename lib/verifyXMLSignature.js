/*
  Wrapper around xml-crypto which kinda forces xmldom and xpath
  Not the prettiest but will do
*/

const { DOMParser } = require('@xmldom/xmldom')
const { useNamespaces } = require('xpath')
const { SignedXml } = require('xml-crypto')
const certToPem = require('./certToPem')

const verifyXMLSignature = function (xmlString) {
  const xmlDoc = new DOMParser().parseFromString(xmlString)  
  const xpathSelect = useNamespaces({
    xmldsig: 'http://www.w3.org/2000/09/xmldsig#'
  })

  const signatureNode = xpathSelect('//xmldsig:Signature', xmlDoc)[0]  
  const cert = xpathSelect('//xmldsig:X509Certificate/text()', signatureNode)[0].nodeValue
  const pem = certToPem(cert)

  const signedXml = new SignedXml()
  signedXml.keyInfoProvider = new CustomKeyInfoProvider(pem)
  signedXml.loadSignature(signatureNode)

  if (!signedXml.checkSignature(xmlString)) {
    throw new Error('Invalid XML signature')
  }

  return true
}

/*
  Default provider assumes file to read.
  We will return the pem string instead
*/
const CustomKeyInfoProvider = function (str) {
  this.getKeyInfo = function () {
    return '<X509Data></X509Data>'
  }

  this.getKey = function () {
    return this.key
  }
}

module.exports = verifyXMLSignature
