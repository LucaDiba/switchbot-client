import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggleBrightnessColor } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.COLOR_BULB;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorStatusBody<DeviceType> & {
    colorTemperature: number;
  };

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotColorBulb extends DeviceWithPowerToggleBrightnessColor<
  StatusBody,
  CommandBody
> {
  /**
   * Set color temperature.
   * @param colorTemperature Number between 2700 and 6500.
   */
  public setColorTemperature = async (colorTemperature: number) => {
    return this.sendCommand("setColorTemperature", colorTemperature);
  };
}
