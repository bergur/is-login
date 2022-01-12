const certToPem = require('./certToPem')

describe('certToPem', () => {  
  it('should add BEGIN CERTIFICATE if its not present', () => {
    const cert = 'MIIFpTCCA42gAwIBAgIBBjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJJUzET'
    const pem = certToPem(cert)    
    const occurences = pem.split('-BEGIN CERTIFICATE-').length - 1

    expect(pem).toContain('BEGIN CERTIFICATE')
    expect(occurences).toBe(1)
  })

  it('should add END CERTIFICATE if its not present', () => {
    const cert = 'MIIFpTCCA42gAwIBAgIBBjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJJUzET'
    const pem = certToPem(cert)
    const occurences = pem.split('-END CERTIFICATE-').length - 1

    expect(pem).toContain('END CERTIFICATE')
    expect(occurences).toBe(1)
  })

  it('should not add BEGIN CERTIFICATE when present', () => {
    const cert = '-BEGIN CERTIFICATE-MIIFpTCCA42gAwIBAgIBBjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJJUzET'
    const pem = certToPem(cert)
    const occurences = pem.split('-BEGIN CERTIFICATE-').length - 1

    expect(pem).toContain('BEGIN CERTIFICATE')
    expect(occurences).toBe(1)
  })

  it('should not add END CERTIFICATE when present', () => {
    const cert = '-END CERTIFICATE-MIIFpTCCA42gAwIBAgIBBjANBgkqhkiG9w0BAQUFADBsMQswCQYDVQQGEwJJUzET'
    const pem = certToPem(cert)
    const occurences = pem.split('-END CERTIFICATE-').length - 1

    expect(pem).toContain('END CERTIFICATE')
    expect(occurences).toBe(1)
  })
})