/*
  Gets the user information from the xml document
  and puts the information into an object.
  The user object contains the same properties as the
  xml document. Map it to your type as needed.
*/

const getUser = function (attributes) {
  if (!attributes || attributes.length === 0) {
    return undefined
  }

  const user = {}
  for (const att of attributes) {
    user[att.$.Name] = att.AttributeValue._
  }

  return user
}

module.exports = getUser
