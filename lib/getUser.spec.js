const getUser = require('./getUser')

describe('getUser', () => {  
  const mock = [
    {
      '$': {
        Name: 'UserSSN',
        NameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        FriendlyName: 'Kennitala'
      },
      AttributeValue: { _: '1234567890', '$': [Object] }
    },
    {
      '$': {
        Name: 'Name',
        NameFormat: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        FriendlyName: 'Nafn'
      },
      AttributeValue: { _: 'Jón Jónsson', '$': [Object] }
    },
  ]
  
  it('should return an object', () => {
    const correctUser = {
      UserSSN: '1234567890',
      Name: 'Jón Jónsson'
    }
    
    const user = getUser(mock)

    expect(user).toMatchObject(correctUser)
  })

  it('should return undefined for empty arrays', () => {    
    const user = getUser([])
    expect(user).toBe(undefined)
  })

  it('should return undefined for undefined', () => {    
    const user = getUser(undefined)
    expect(user).toBe(undefined)
  })


})