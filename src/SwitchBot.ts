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

  private request = async <T>(method: string, path: string, body: any) => {
    const t = Date.now();
    const nonce = randomUUID();
    const data = this._openToken + t + nonce;
    const sign = createHmac("sha256", this._secretKey)
      .update(Buffer.from(data, "utf-8"))
      .digest()
      .toString("base64");

    const response = await this._axios.request<T>({
      method,
      url: path,
      data: body,
      headers: {
        sign,
        nonce,
        t,
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    });

    return response.data;
  };

  private getRequest = async <T>(path: string) => {
    return this.request<T>("GET", path, "");
  };

  private postRequest = async <T>(path: string, body: any) => {
    return this.request<T>("POST", path, body);
  };
}
