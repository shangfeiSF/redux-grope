const MATCHES = ['main', '10.real-world', 'main/10.real-world/']
const REPLACED = ['facebook', 'react', 'facebook/react/']

export default {
  replace(originalValue){
    let replacedValue = originalValue

    let index = MATCHES.indexOf(originalValue)

    if (index > -1) {
      replacedValue = originalValue.replace(MATCHES[index], REPLACED[index])
    }

    return replacedValue
  }
}