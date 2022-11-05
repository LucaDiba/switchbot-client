<h1 align="center">SwitchBot client</h1>
<h2 align="center">⚠️ This package is in alpha ⚠️</h2>
<p>
  <a href="https://www.npmjs.com/package/@lucadiba/switchbot-client">
    <img alt="NPM package" src="https://img.shields.io/npm/v/@lucadiba/switchbot-client?color=blue" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/actions/workflows/ci.yml">
    <img alt="CI build" src="https://github.com/LucaDiba/switchbot-client/actions/workflows/ci.yml/badge.svg" />
  </a>
  <img alt="Code coverage" src="https://codecov.io/gh/LucaDiba/switchbot-client/branch/main/graph/badge.svg?token=RvIg6LPcvm" />
  <a href="https://github.com/LucaDiba/switchbot-client/graphs/commit-activity">
    <img alt="Maintained" src="https://img.shields.io/badge/maintained-yes-brightgreen.svg" />
  </a>
  <a href="https://lucadiba.github.io/switchbot-client/modules/SwitchBot.html">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/github/license/LucaDiba/switchbot-client" />
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

Currently supported devices:

- Bot
- Plug
- Plug Mini
- Lock
- [📘 Full documentation](https://lucadiba.github.io/switchbot-client/modules/SwitchBot.html)

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
This project is [MIT](https://github.com/LucaDiba/switchbot-client/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
