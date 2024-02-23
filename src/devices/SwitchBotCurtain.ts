import {
  BaseDeviceGetDeviceBody,
  BaseDeviceStatusBody,
  DeviceId,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType = typeof DEVICE_TYPES.CURTAIN;

export type GetDeviceBodyCurtainBase<T> = BaseDeviceGetDeviceBody<T> & {
  curtainDevicesIds: DeviceId[];
  calibrate: boolean;
  group: boolean;
  master: boolean;
  openDirection: string; // TODO: determine possible values ("left" | "right" ?)
};

export type GetDeviceBody = GetDeviceBodyCurtainBase<DeviceType>;

export type StatusBody<T> = BaseDeviceStatusBody<T> & {
  calibrate: boolean;
  group: boolean;
  moving: boolean;
  slidePosition: String;
};

export type CommandBody = any; // TODO: Figure out what this is

enum SetPositionMode {
  PERFORMANCE = "0",
  SILENT = "1",
  DEFAULT = "ff",
}

export class SwitchBotCurtainBase<T> extends DeviceWithStatus<
  StatusBody<T>,
  CommandBody
> {
  /**
   * @param position
   *  Must be a number between 0 and 100.
   *  0 means opened, 100 means closed.
   */
  public setPosition = (position: number) => {
    if (position < 0 || position > 100) {
      throw new Error("Position must be between 0 and 100");
    }

    const parameter = `0,${SetPositionMode.DEFAULT},${position}`;

    return this.sendCommand("setPosition", parameter);
  };

  /**
   * Open the curtain (equivalent to set position to 0).
   */
  public open = () => this.sendCommand("turnOn");

  /**
   * Close the curtain (equivalent to set position to 100).
   */
  public close = () => this.sendCommand("turnOff");
}

export default class SwitchBotCurtain extends SwitchBotCurtainBase<DeviceType> {}
