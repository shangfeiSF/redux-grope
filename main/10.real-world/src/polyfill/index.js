const MATCHES = ['10.real-world', '10.real-world/']
const REPLACED = ['tj', 'tj']

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