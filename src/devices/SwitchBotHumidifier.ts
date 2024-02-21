import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithTemperatureHumidityStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithTemperatureHumidity } from "./Device";

type DeviceType = typeof DEVICE_TYPES.HUMIDIFIER;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithTemperatureHumidityStatusBody<DeviceType> & {
    nebulizationEfficiency: number;
    auto: boolean;
    childLock: boolean;
    sound: boolean;
    lackWater: boolean;
  };

export type CommandBody = never;

export default class SwitchBotMeter extends DeviceWithTemperatureHumidity<
  StatusBody,
  CommandBody
> {
  /**
   * @param mode
   *  Must be "auto" or a number between 0 and 100 (atomization efficiency).
   */
  public setMode = async (mode: "auto" | number) => {
    if (mode === "auto") {
      return this.sendCommand("setMode", "auto");
    }

    if (mode < 0 || mode > 100) {
      throw new Error("Atomization efficiency must be between 0 and 100");
    }

    return this.sendCommand("setMode", Math.round(mode).toString());
  };
}
