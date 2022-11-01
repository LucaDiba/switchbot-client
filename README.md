<h1 align="center">Welcome to @lucadiba/switchbot-client 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/LucaDiba/switchbot-client#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/LucaDiba/switchbot-client/blob/main/LICENSE" target="_blank">
    <img alt="License: GPL--3.0" src="https://img.shields.io/github/license/LucaDiba/switchbot-client" />
  </a>
</p>

> A client for SwitchBot APIs

### 🏠 [Homepage](https://github.com/LucaDiba/switchbot-client#readme)

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

// Turn on SwitchBot Bot
await switchbot.bot("deviceId").turnOn();
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
This project is [GPL--3.0](https://github.com/LucaDiba/switchbot-client/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
