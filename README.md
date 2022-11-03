<h1 align="center">Welcome to @lucadiba/switchbot-client 👋</h1>
<h2 align="center">⚠️ This package is in alpha ⚠️</h2>
<p>
  <a href="https://www.npmjs.com/package/@lucadiba/switchbot-client">
    <img alt="NPM package" src="https://img.shields.io/npm/v/@lucadiba/switchbot-client?color=blue" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/actions/workflows/main.yml">
    <img alt="CI build" src="https://github.com/LucaDiba/switchbot-client/actions/workflows/ci.yml/badge.svg" />
  </a>
  <img alt="Code coverage" src="https://codecov.io/gh/LucaDiba/switchbot-client/branch/main/graph/badge.svg?token=RvIg6LPcvm" />
  <a href="https://github.com/LucaDiba/switchbot-client/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://lucadiba.github.io/switchbot-client/classes/index.SwitchBot.html">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/blob/main/LICENSE">
    <img alt="License: GPL--3.0" src="https://img.shields.io/github/license/LucaDiba/switchbot-client" />
  </a>
</p>

> A JavaScript client for SwitchBot 1.1 APIs with built-in TypeScript types.

## Install

```sh
npm install @lucadiba/switchbot-client
```

## Usage

```typescript
import SwitchBot from "@lucadiba/switchbot-client";

const switchbot = new SwitchBot({
  openToken: "openToken",
  secretKey: "secretKey",
});

// Press SwitchBot Bot
switchbot.bot("deviceId").press();
```

Currently supported APIs:

- Bot
  - get status
  - turn on
  - turn off
  - press

## Run tests

```sh
npm run test
```

## Author

👤 **Luca Dibattista**

- Website: https://lucadibattista.it
- Github: [@LucaDiba](https://github.com/LucaDiba)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/LucaDiba/switchbot-client/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Luca Dibattista](https://github.com/LucaDiba).<br />
This project is [GPL-3.0](https://github.com/LucaDiba/switchbot-client/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
