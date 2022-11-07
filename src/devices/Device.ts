import {
  BaseDeviceStatusBody,
  BaseDeviceWithPowerBrightnessColorStatusBody,
  BaseDeviceWithPowerBrightnessColorTemperatureStatusBody,
  BaseDeviceWithPowerBrightnessStatusBody,
  BaseDeviceWithPowerStatusBody,
  BaseDeviceWithTemperatureHumidityStatusBody,
  Deps,
  DeviceCommandResponse,
  DeviceId,
  DeviceStatusReponse,
} from "../types.js";
import { DEVICE_TYPES_ARRAY } from "../utils/constant.js";
import {
  returnDeviceCommandBodyOrThrow,
  returnDeviceStatusBodyOrThrow,
} from "../utils/response.js";

type DeviceTypes = typeof DEVICE_TYPES_ARRAY[number];

export type GetStatusOptions = {
  forceRefresh?: boolean;
};

export class Device {
  protected readonly _deviceId: DeviceId;

  protected readonly _deps: Deps;

  constructor(deviceId: DeviceId, deps: Deps) {
    this._deviceId = deviceId;
    this._deps = deps;
  }

  protected _getPath = (path: string) => {
    return `/v1.1/devices/${this._deviceId}${path}`;
  };
}

export class DeviceWithStatus<
  DeviceStatusBody extends BaseDeviceStatusBody<DeviceTypes>,
  CommandBody
> extends Device {
  private _cachedStatus: DeviceStatusBody | null = null;

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

  protected sendCommand = async (
    command: string,
    parameter: any = "default"
  ) => {
    const response = await this._deps.postRequest<
      DeviceCommandResponse<CommandBody>
    >(this._getPath("/commands"), {
      command,
      parameter,
      commandType: "command",
    });

    return returnDeviceCommandBodyOrThrow(response);
  };
}

export class DeviceWithPower<
  StatusBody extends BaseDeviceWithPowerStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithStatus<StatusBody, CommandBody> {
  public getPowerStatus = async () => {
    const status = await this.getStatus();

    if (status.power === "on" || status.power === "off") {
      return status.power;
    }

    throw new Error(`Unexpected power status: ${status.power}`);
  };

  /**
   * Set the device to on state.
   */
  public turnOn = async () => {
    return this.sendCommand("turnOn");
  };

  /**
   * Set the device to off state.
   */
  public turnOff = async () => {
    return this.sendCommand("turnOff");
  };
}

export class DeviceWithPowerToggle<
  StatusBody extends BaseDeviceWithPowerStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithPower<StatusBody, CommandBody> {
  /**
   * Toggle the device power state.
   */
  public toggle = async () => {
    return this.sendCommand("toggle");
  };
}

export class DeviceWithPowerToggleBrightness<
  StatusBody extends BaseDeviceWithPowerBrightnessStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithPowerToggle<StatusBody, CommandBody> {
  /**
   * Set brightness.
   * @param brightness Number between 0 and 100.
   */
  public setBrightness = async (brightness: number) => {
    return this.sendCommand("setBrightness", brightness);
  };
}

export class DeviceWithPowerToggleBrightnessColor<
  StatusBody extends BaseDeviceWithPowerBrightnessColorStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithPowerToggleBrightness<StatusBody, CommandBody> {
  /**
   * Set color.
   * @param rgb An array of 3 numbers representing the RGB values.
   * - `rgb[0]` is the red value (0-255).
   * - `rgb[1]` is the green value (0-255).
   * - `rgb[2]` is the blue value (0-255).
   *
   * E.g., `[255, 0, 0]` is red.
   */
  public setColor = async (rgb: [number, number, number]) => {
    const [r, g, b] = rgb;
    return this.sendCommand("setColor", `${r}:${g}:${b}`);
  };
}

export class DeviceWithPowerToggleBrightnessColorTemperature<
  StatusBody extends BaseDeviceWithPowerBrightnessColorTemperatureStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithPowerToggleBrightness<StatusBody, CommandBody> {
  /**
   * Set color temperature.
   * @param colorTemperature Number between 2700 and 6500.
   */
  public setColorTemperature = async (colorTemperature: number) => {
    return this.sendCommand("setColorTemperature", colorTemperature);
  };
}

export class DeviceWithTemperatureHumidity<
  StatusBody extends BaseDeviceWithTemperatureHumidityStatusBody<DeviceTypes>,
  CommandBody
> extends DeviceWithStatus<StatusBody, CommandBody> {
  /**
   * @returns Temperature in celsius.
   */
  public getTemperature = async () => (await this.getStatus()).temperature;

  /**
   * @returns Humidity percentage (integer, 0 - 100).
   */
  public getHumidity = async () => (await this.getStatus()).humidity;
}
