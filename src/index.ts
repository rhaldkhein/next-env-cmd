import nextEnv from '@next/env'
import path from 'path'

export interface Options {
  dir?: string
  parent?: string | null
  production?: boolean
}

export function loadEnv(
  opts: Options = {}) {


  // prepare variables
  const pwd = process.env.PWD || ''
  let dev = (process.env.NODE_ENV || 'development') === 'development'
  let mainEnv: nextEnv.Env = {}
  let parentEnv: nextEnv.Env = {}

  // override to load production env files
  if (opts.production) dev = false

  // load parent env directory first
  if (opts.parent) {
    parentEnv = nextEnv.loadEnvConfig(
      path.resolve(pwd, opts.parent),
      dev
    ).combinedEnv
  }

  // load main env directory
  mainEnv = nextEnv.loadEnvConfig(
    path.resolve(pwd, opts.dir || './'),
    dev,
    undefined,
    true
  ).combinedEnv

  // combine variables
  Object.assign(
    process.env,
    {
      NODE_ENV: process.env.NODE_ENV || (dev ? 'development' : 'production'),
      ...parentEnv,
      ...mainEnv
    }
  )

}
