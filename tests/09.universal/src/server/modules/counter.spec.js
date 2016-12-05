import {counter} from '../../../../../main/09.universal/src/server/modules/counter'

describe('counter', () => {
  it('should return the random number based on config', () => {
    const config = {
      delay: 300,
      min: 10,
      max: 20
    }

    counter(config).then(data => {
      expect(data >= config.min).toEqual(true)
      expect(data <= config.max).toEqual(true)
    })
  })
})