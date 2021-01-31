const fs = require('fs')

fs.rename('./packages/api/.env.example', './packages/api/.env', err =>
  err ? console.log(err) : console.log('Server/api env vars setup successful')
)

fs.rename('./packages/web/.env.example', './packages/web/.env', err =>
  err ? console.log(err) : console.log('Web env vars setup successful')
)

fs.rename('./packages/mobile/.env.example', './packages/mobile/.env', err =>
  err ? console.log(err) : console.log('Mobile env vars setup successful')
)
