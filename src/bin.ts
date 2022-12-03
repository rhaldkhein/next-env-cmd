#! /usr/bin/env node
import { program } from 'commander'
import spawn from 'cross-spawn'
import { name, version, description } from '../package.json'
import { loadEnv, Options } from './index'

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

// load env files
loadEnv(opts)

// spawn command and gracefully exit process
const ps = spawn(args[0], args.slice(1), { stdio: 'inherit' })
ps.on('close', (status) => process.exit(status || undefined))
process.on('SIGTERM', () => ps.kill())
