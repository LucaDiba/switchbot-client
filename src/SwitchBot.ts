import axios, { AxiosInstance } from "axios";
import { createHmac, randomUUID } from "crypto";
import SwitchBotBot from "./devices/SwitchBotBot.js";
import SwitchBotCurtain from "./devices/SwitchBotCurtain.js";
import SwitchBotLock from "./devices/SwitchBotLock.js";
import SwitchBotPlug from "./devices/SwitchBotPlug.js";
import SwitchBotPlugMini from "./devices/SwitchBotPlugMini.js";
import { DeviceId } from "./types.js";

export type SwitchBotOptions = {
  openToken: string;
  secretKey: string;
};

export default class SwitchBot {
  private readonly _openToken: string;

  private readonly _secretKey: string;

  private readonly _axios: AxiosInstance;

  constructor(options: SwitchBotOptions) {
    this._openToken = options.openToken;
    this._secretKey = options.secretKey;

    this._axios = axios.create({
      baseURL: "https://api.switch-bot.com",
      headers: {
        Authorization: this._openToken,
      },
    });
  }

  public bot = (deviceId: DeviceId) => {
    return new SwitchBotBot(deviceId, this.getDeps());
  };

  public plug = (deviceId: DeviceId) => {
    return new SwitchBotPlug(deviceId, this.getDeps());
  };

  public plugMini = (deviceId: DeviceId) => {
    return new SwitchBotPlugMini(deviceId, this.getDeps());
  };

  public curtain = (deviceId: DeviceId) => {
    return new SwitchBotCurtain(deviceId, this.getDeps());
  };

  public lock = (deviceId: DeviceId) => {
    return new SwitchBotLock(deviceId, this.getDeps());
  };

  private getDeps = () => ({
    getRequest: this.getRequest,
    postRequest: this.postRequest,
  });

  private getRequestHeaders = () => {
    const t = Date.now();
    const nonce = randomUUID();
    const data = this._openToken + t + nonce;
    const sign = createHmac("sha256", this._secretKey)
      .update(Buffer.from(data, "utf-8"))
      .digest()
      .toString("base64");

    return {
      sign,
      nonce,
      t,
    };
  };

  private getRequest = async <T>(path: string) => {
    const response = await this._axios.get<T>(path, {
      headers: this.getRequestHeaders(),
    });

    return response.data;
  };

  private postRequest = async <T>(path: string, body: any) => {
    const response = await this._axios.post<T>(path, body, {
      headers: {
        ...this.getRequestHeaders(),
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };
}
