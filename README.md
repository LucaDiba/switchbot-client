<h1 align="center">SwitchBot client</h1>
<h2 align="center">⚠️ This package is in beta ⚠️</h2>
<p>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white" />
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

> A JavaScript client for SwitchBot 1.1 APIs with built-in TypeScript types.<br />
> This package supports both ESM and CommonJS.

## Installation

Install the package using your preferred package manager:

```sh
npm install @lucadiba/switchbot-client
```

## Usage

### Initialize the client

Import the package in your application.

```typescript
import SwitchBot from "@lucadiba/switchbot-client";
```

Initialize the client with your open token and secret key. You can [find these values in the SwitchBot app](https://support.switch-bot.com/hc/en-us/articles/12822710195351-How-to-obtain-a-Token).

```typescript
const switchbot = new SwitchBot({
  openToken: "openToken",
  secretKey: "secretKey",
});
```

### Device

To interact with a device, you need to know its ID. You can find it in the SwitchBot app or by calling the `devices` method.

```typescript
const devices = await switchbot.devices();
// [{
//   deviceId: "deviceId",
//   ...
// }]
```

Then, you can interact with the device.

```typescript
// Press SwitchBot Bot
switchbot.bot("deviceId").press();
```

### Scene

```typescript
// Execute SwitchBot Scene
switchbot.scene("sceneId").execute();
```

## Support

The following devices are supported:

- Bot
- Ceiling Light
- Ceiling Light Pro
- Color Bulb
- Contact Sensor
- Curtain
- Curtain 3
- Hub
- Hub 2
- Hub Plus
- Hub Mini
- Humidifier
- Indoor Cam
- Keypad
- Keypad Touch
- Lock
- Meter
- Meter Plus
- Motion Sensor
- Pan/Tilt Cam
- Pan/Tilt Cam 2K
- Plug
- Plug Mini (US)
- Plug Mini (JP)
- Remote
- Robot Vacuum Cleaner S1
- Robot Vacuum Cleaner S1 Plus
- Strip Light
- [📘 Full documentation](https://lucadiba.github.io/switchbot-client/modules/SwitchBot.html)

The following devices are currently not supported:

- Battery Circulator Fan
- Blind Tilt
- Outdoor meter
- Virtual infrared remote devices

## Author

👤 **Luca Dibattista**

- Website: https://lucadibattista.it
- Github: [@LucaDiba](https://github.com/LucaDiba)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />
Feel free to check [issues page](https://github.com/LucaDiba/switchbot-client/issues).<br />
Please run `npx changeset` and follow the instructions to create a new changeset before opening a pull request.

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Luca Dibattista](https://github.com/LucaDiba).<br />
This project is [MIT](https://github.com/LucaDiba/switchbot-client/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
