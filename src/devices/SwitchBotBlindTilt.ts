import {
  BaseDeviceGetDeviceBody,
  BaseDeviceStatusBody,
  DeviceId,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType = typeof DEVICE_TYPES.BLIND_TILT;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType> & {
  blindTiltDevicesIds: DeviceId[];
  version: number;
  calibrate: boolean;
  group: boolean;
  master: boolean;
  direction: "up" | "down";
  slidePosition: number;
};

export type StatusBody = BaseDeviceStatusBody<DeviceType> & {
  version: number;
  calibrate: boolean;
  group: boolean;
  moving: boolean;
  direction: "up" | "down";
  slidePosition: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotBlindTilt extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {
  /**
   * @param position
   *  Must be a number between 0 and 100.
   *  0 means closed, 100 means opened.
   *  Odd numbers are rounded down to the nearest even number.
   *
   * @param direction
   *  The direction to move the blind tilt.
   */
  public setPosition = (position: number, direction: "up" | "down") => {
    if (position < 0 || position > 100) {
      throw new Error("Position must be between 0 and 100");
    }

    // Position must be set to a multiple of 2
    let evenPosition = position;
    if (position % 2 !== 0) {
      evenPosition = position - 1;
    }

    const parameter = `${direction},${evenPosition}`;

    return this.sendCommand("setPosition", parameter);
  };

  /**
   * Set the position of the Blind Tilt to open
   * (equivalent to setting position to "0 up" or "100 down").
   */
  public open = () => this.sendCommand("fullyOpen");

  /**
   * Set the position of the Blind Tilt to closed up
   * (equivalent to setting position to "0 up").
   */
  public closeUp = () => this.sendCommand("closeUp");

  /**
   * Set the position of the Blind Tilt to closed down
   * (equivalent to setting position to "0 down").
   */
  public closeDown = () => this.sendCommand("closeDown");
}
