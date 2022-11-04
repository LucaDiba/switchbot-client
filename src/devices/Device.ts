import {
  BaseDeviceStatusBody,
  BaseDeviceWithPowerStatusBody,
  Deps,
  DeviceId,
  DeviceStatusReponse,
} from "../types.js";
import { returnDeviceStatusBodyOrThrow } from "../utils/response.js";

export type GetStatusOptions = {
  forceRefresh?: boolean;
};

export class Device<DeviceStatusBody extends BaseDeviceStatusBody> {
  protected readonly _deviceId: DeviceId;

  protected readonly _deps: Deps;

  private _cachedStatus: DeviceStatusBody | null = null;

  constructor(deviceId: DeviceId, deps: Deps) {
    this._deviceId = deviceId;
    this._deps = deps;
  }

  private _getPath = (path: string) => {
    return `/v1.1/devices/${this._deviceId}${path}`;
  };

  public getStatus = async (options: GetStatusOptions = {}) => {
    const forceRefresh = options.forceRefresh ?? false;

    if (this._cachedStatus && !forceRefresh) {
      return this._cachedStatus;
    }

    const response = await this._deps.getRequest<
      DeviceStatusReponse<DeviceStatusBody>
    >(this._getPath("/status"));

    this._cachedStatus = returnDeviceStatusBodyOrThrow(response);
    return this._cachedStatus;
  };

  public getHubDeviceId = async () => {
    const status = await this.getStatus();
    return status.hubDeviceId;
  };

  protected sendCommand = async <T>(
    command: string,
    parameter: string = "default"
  ) => {
    const response = await this._deps.postRequest<DeviceStatusReponse<T>>(
      this._getPath("/commands"),
      {
        command,
        parameter,
        commandType: "command",
      }
    );

    return returnDeviceStatusBodyOrThrow(response);
  };
}

export class DeviceWithPower<
  StatusBody extends BaseDeviceWithPowerStatusBody,
  CommandBody
> extends Device<StatusBody> {
  public getPowerStatus = async () => {
    const status = await this.getStatus();

    if (status.power === "on" || status.power === "off") {
      return status.power;
    }

    throw new Error(`Unexpected power status: ${status.power}`);
  };

  public turnOn = async () => {
    return this.sendCommand<CommandBody>("turnOn");
  };

  public turnOff = async () => {
    return this.sendCommand<CommandBody>("turnOff");
  };
}
