const random = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
)

export const counter = (config) => new Promise(resolve => {
  setTimeout(() => {
    resolve(random(config.min, config.max))
  }, config.delay)
})