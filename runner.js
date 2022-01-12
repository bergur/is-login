const path = require('path')
const { readFileSync } = require('fs')
const makeLogin = require('.')

const example = readFileSync(path.join(__dirname, '/assets/example.xml')).toString(
  'base64'
)

const authorityPem = readFileSync(path.join(__dirname, '/assets/Gamalt.cer')).toString('utf-8')

const login = makeLogin({
  authorityPem,
  audience: 'login.advania.is',
  callbackUrl: 'https://login.advania.is/islogin.aspx'
})

login(example).then((user) => {
  console.log(user)
})
