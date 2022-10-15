# next-env-cmd

Load .env files using @next/env module.


### Install

```sh
$ npm install next-env-cmd
```

### Usage

Using [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) filename format.

```txt
/.env.development
/.env.development.local
/.env.test
/.env.test.local
```

In `package.json`.
```json
{
  "script": {
    "dev": "next-env-cmd node start.js",
    "test": "NODE_ENV=test next-env-cmd node start.js"
  }
}
```

Command available options.

```txt
Usage: next-env-cmd [options] <command> [...args]

Examples:
  $ next-env-cmd node start.js          # load .env files in CWD
  $ next-env-cmd -d ~/ node start.js    # load .env files in ~/
  $ nexenv -p ../ node start.js         # alias shorthand command

Options:
  -v, --version        output the version number
  -d, --dir [path]     Custom env directory path (default: "./")
  -p, --parent [path]  Parent env directory path to be merged as defaults
  -h, --help           display help for command
```
