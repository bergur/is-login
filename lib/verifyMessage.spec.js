const verifyMessage = require('./verifyMessage')

describe('verifyMessage', () => {
  it ('should succeed when all information match', () => {
    const fakeNow = new Date(2020, 1, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }    
    
    expect(() => verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).not.toThrow()
  })

  it('should return true when all information match', () => {
    const fakeNow = new Date(2020, 1, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
    
    expect(verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).toBe(true)
  })

  it('should fail when issuer is not Þjóðskrá Íslands', () => {
    const fakeNow = new Date(2020, 1, 1)
    const assertions = {
      issuer: 'SOMETHINGWRONG',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).toThrow('Issuer in message is not Þjóðskrá Íslands')
  })

  it('should fail when audience dont match', () => {
    const fakeNow = new Date(2020, 1, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'SOMETHINGWRONG', 'https://test.api.is', fakeNow)).toThrow('Audience in message and given audience does not match')
  })

  it('should fail when destination and callback url dont match', () => {
    const fakeNow = new Date(2020, 1, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'test', 'SOMETHINGWRONG', fakeNow)).toThrow('Destination in message and callback url do not match')
  })

  it('should fail when date is before notBefore', () => {
    const fakeNow = new Date(2019, 1, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).toThrow('essage not yet valid or expired')
  })

  it('should fail when date is on notOnOrAfter', () => {
    const fakeNow = new Date(2020, 2, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).toThrow('essage not yet valid or expired')
  })

  it('should fail when date is after notOnOrAfter', () => {
    const fakeNow = new Date(2021, 2, 1)
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      audience: 'test',
      destination: 'https://test.api.is',
      notBefore: new Date(2020, 0, 1),
      notOnOrAfter: new Date(2020, 2, 1),
    }
        
    expect(() => verifyMessage(assertions, 'test', 'https://test.api.is', fakeNow)).toThrow('essage not yet valid or expired')
  })
/*
  it ('should fail when "now" is before condition date notBefore', () => {
    const today = new Date()

    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      notBefore: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
      notOnOrAfter: today
    }

    expect(() => verifyMessage(assertions, 'test', 'test.com', today)).toThrow('Message not yet valid or expired')
  })

  it ('should fail when "now" is after condition date notOnOrAfter', () => {
    const today = new Date()
    
    const assertions = {
      issuer: 'Þjóðskrá Íslands',
      notBefore: today,
      notOnOrAfter: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    }

    expect(() => verifyMessage(assertions, 'test', 'test.com', today)).toThrow('Message not yet valid or expired')
  })
*/

})