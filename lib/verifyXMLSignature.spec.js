const { readFileSync } = require('fs')
const { join } = require('path')
const verifyXMLSignature = require('./verifyXMLSignature')

describe('verifyXMLSignature', () => {    
  it('should verify correctly signed xml', () => {
    const token = readFileSync(join(__dirname, '../assets/example.xml')).toString('base64')
    const xmlString = Buffer.from(token, 'base64').toString('utf-8')

    expect(() => verifyXMLSignature(xmlString)).not.toThrow()
  })
})