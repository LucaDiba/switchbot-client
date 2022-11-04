import { Deps, DeviceStatusReponse } from "../types.js";
import { DEVICE_TYPES_ARRAY } from "../utils/constant.js";
import { returnDeviceStatusBodyOrThrow } from "../utils/response.js";

export type GetStatusOptions = {
  forceRefresh?: boolean;
};

export default class Device<
  DeviceId,
  DeviceStatusBody extends {
    deviceId: DeviceId;
    deviceType: typeof DEVICE_TYPES_ARRAY[number];
    deviceName: string;
    hubDeviceId: DeviceId;
  }
> {
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
