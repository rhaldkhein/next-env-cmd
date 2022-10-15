# next-env-cmd

CLI command for loading .env files using [`@next/env`](https://nextjs.org/docs/basic-features/environment-variables) and spawn process using [`cross-spawn`](https://github.com/moxystudio/node-cross-spawn) modules.

**Note:** This command can be used without installing Next.js framework.

### Install

```sh
$ npm install next-env-cmd
```

### Usage

Use [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) filename format.

```txt
/.env
/.env.development
/.env.development.local
/.env.test
/.env.test.local
```

And then in `package.json`.
```js
{
  "script": {
    // defaults to load development env vars
    "dev": "next-env-cmd node start.js",
    // load production env vars in home directory
    "start": "NODE_ENV=production next-env-cmd -d ~/ node start.js",
    // load test env vars for testing (using alias "nexenv")
    "test": "NODE_ENV=test nexenv jest"
  }
}
```

Additional command options.

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

### License

MIT
