import { AceBase } from 'acebase'

const options = {
  logLevel: 'log',
  storage: { path: './storage' },
}

const acebase = new AceBase('database', options)

acebase.ready(() => {
  console.log('Database ready to use')
})

export { acebase }
