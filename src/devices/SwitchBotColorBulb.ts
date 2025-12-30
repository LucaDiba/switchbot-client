import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerBrightnessColorStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithPowerToggleBrightnessColor } from "./Device";

type DeviceType = typeof DEVICE_TYPES.COLOR_BULB;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithPowerBrightnessColorStatusBody<DeviceType> & {
    colorTemperature: number;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
