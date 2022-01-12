# island.is-login
Þessi módúll tekur á móti island.is login token, verify-ar og skilar user-objecti út.

## Hvernig virkar island.is innskráning?
1. Þú sækir um að fá aðgang að innskráningarþjónustunni. Sjá https://island.is/s/stafraent-island/thjonustur
2. Þú gefur upp auðkenni (e. audience)
3. Þú gefur upp vefslóð sem vefþjónustan kallar á (e. callback url)
4. Þegar umsóknin er samþykkt getur þú notað https://innskraning.island.is/?id=eitthvaðauðkenni
4. Notandinn slær inn símanúmerið og vefþjónustan gerir http post request á slóðina sem þú gafst upp
5. Í kóðanum þínum tekur þú á móti sendingunni. **Þessi módúll hjálpar þér þar.**

## Hvernig virkar kóðinn
1. Þú installar með `npm i island.is-login`
2. Þú sækir skilríkjakeðjuna *FullAuðkenni.cer* á https://www.audkenni.is/adstod/skilriki-kortum/skilrikjakedjur/
3. Þessi kóði tekur base64 tokenið sem vefþjónusta island.is póstar á slóðina þína
4. Breytir í XML/SAML skeyti.
5. Sannreynir að skilríkið inn í XML-skjalinu sé undirritað og gefið út af skilríkjakeðjunni, það sé sé gilt, o.s.frv
6. Sannreynir að skeytið sé undirritað af skilríkinu sem fylgir í skeytinu.
7. Sannreynir að upplýsingarnar í skeytinu séu réttar m.v. þitt kerfi.


## Kóðaæmi

```javascript
const islogin = require('island')
const { readFileSync } = require('fs)

// Read the PEM from Auðkenni/Þjóðskrá
const pem = readFileSync('FullgiltAudkenni.cer").toString('utf-8)

// Make the login function
const login = makeLogin({
  authorityPem: pem,
  audience: 'WHAT_YOU_WROTE_IN_YOUR_APPLICATION'
  callbackUrl: 'WHAT_YOU_WROTE_IN_YOUR_APPLICATION'
})

// Token comes from the island.is request to your route
// If you're using expressjs somehting like req.body.token
login(token)
  .then(user => {
    console.log(user)
  })
  .catch(error => {
    console.log(error)
  })
```

Or you can use async/await

```javascript
try {
  const user = await login(token)
  console.log(user)
} catch (error ) {
  console.log(error)
}
```

## Spurningar og svör


