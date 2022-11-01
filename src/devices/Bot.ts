import { Deps, DeviceStatusReponse } from "../types.js";
import { returnDeviceStatusBodyOrThrow } from "../utils/response.js";

type DeviceId = string;

type DeviceStatusBody = {
  deviceId: DeviceId;
  deviceType: "Bot";
  power: "on" | "off";
  hubDeviceId: DeviceId;
};

type DeviceCommandBody = {};

export default class Bot {
  private readonly _deviceId: DeviceId;

  private readonly getRequest: Deps["getRequest"];

  private readonly postRequest: Deps["postRequest"];

  constructor(deviceId: string, deps: Deps) {
    this._deviceId = deviceId;
    this.getRequest = deps.getRequest;
    this.postRequest = deps.postRequest;
  }

  private getPath = (path: string) => {
    return `/v1.1/devices/${this._deviceId}${path}`;
  };

  public getStatus = async () => {
    const response = await this.getRequest<
      DeviceStatusReponse<DeviceStatusBody>
    >(this.getPath("/status"));

    return returnDeviceStatusBodyOrThrow(response);
  };

  public turnOn = async () => {
    const response = await this.postRequest<
      DeviceStatusReponse<DeviceCommandBody>
    >(this.getPath("/commands"), {
      command: "turnOn",
      parameter: "default",
      commandType: "command",
    });

    return returnDeviceStatusBodyOrThrow(response);
  };

  public turnOff = async () => {
    const response = await this.postRequest<
      DeviceStatusReponse<DeviceCommandBody>
    >(this.getPath("/commands"), {
      command: "turnOff",
      parameter: "default",
      commandType: "command",
    });

    return returnDeviceStatusBodyOrThrow(response);
  };

  public press = async () => {
    const response = await this.postRequest<
      DeviceStatusReponse<DeviceCommandBody>
    >(this.getPath("/commands"), {
      command: "press",
      parameter: "default",
      commandType: "command",
    });

    return returnDeviceStatusBodyOrThrow(response);
  };
}
