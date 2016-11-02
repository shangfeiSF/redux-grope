import counter from '../../../main/02.counter/src/reducers/index'

describe('reducers', () => {
  describe('counter', () => {
    it('should provide the initial state to 11', () => {
      var result = counter(undefined, {})

      expect(result).toBe(11)
    })

    it('should handle `INCREMENT` action', () => {
      var result = counter(1, {
        type: 'INCREMENT'
      })

      expect(result).toBe(2)
    })

    it('should handle `DECREMENT` action', () => {
      var result = counter(1, {
        type: 'DECREMENT'
      })

      expect(result).toBe(0)
    })

    it('should ignore unknown actions', () => {
      var result = counter(100, {
        type: 'unknown'
      })

      expect(result).toBe(100)
    })
  })
})