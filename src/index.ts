#! /usr/bin/env node
import { program } from 'commander'
import spawn from 'cross-spawn'
import { loadEnvConfig, Env } from '@next/env'
import path from 'path'
import { name, version, description } from '../package.json'

interface Options {
  dir: string
  parent?: string | null
  production?: boolean
}

const fullDescription = `${description}.

Examples:
  $ next-env-cmd node start.js          # load .env files in CWD
  $ next-env-cmd -d ~/ node start.js    # load .env files in ~/
  $ nexenv -p ../ node start.js         # alias shorthand command`

// prepare cli and args
program
  .name(name)
  .version(version, '-v, --version')
  .description(fullDescription)
  .usage('[options] <command> [...args]')
  .option(
    '-d, --dir [path]',
    'Custom env directory path',
    './'
  )
  .option(
    '-p, --parent [path]',
    'Parent env directory path to be merged as defaults'
  )
  .option(
    '--production',
    'Forcely load production env files'
  )
  .allowUnknownOption(true)
  .parse(process.argv)

// prepare variables
const opts = program.opts<Options>()
const args = program.args
const pwd = process.env.PWD || ''
let dev = (process.env.NODE_ENV || 'development') === 'development'
let mainEnv: Env = {}
let parentEnv: Env = {}

// override to load production env files
if (opts.production) dev = false

// load parent env directory first
if (opts.parent) {
  parentEnv = loadEnvConfig(
    path.resolve(pwd, opts.parent),
    dev
  ).combinedEnv
}

// load main env directory
mainEnv = loadEnvConfig(
  path.resolve(pwd, opts.dir),
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

// spawn command and gracefully exit process
const ps = spawn(args[0], args.slice(1), { stdio: 'inherit' })
ps.on('close', (status) => process.exit(status || undefined))
process.on('SIGTERM', () => ps.kill())
