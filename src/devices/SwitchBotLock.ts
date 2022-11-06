import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.LOCK;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>; // TODO: determine exact type

export type StatusBody = BaseDeviceStatusBody<DeviceType> & {
  lockState: "locked" | "unlocked" | "jammed";
  doorState: "closed" | "opened";
  calibrate: boolean;
};

export type CommandBody = {
  doorState: "closed" | "opened";
  isSlave: boolean;
  doorStateSource: "master" | string; // TODO: determine other possible values
  isSlaveOnline: boolean;
  battery: number;
  pauseAutoLock: boolean;
  lockState: "locked" | "unlocked" | "jammed";
  lastActionSource: "manual" | string; // TODO: determine other possible values
  isCalibrate: boolean;
  power: "on" | "off";
  isGroup: boolean;
  doorOpenedOvertimeWarning: boolean;
  unlockedOvertimeWarning: boolean;
};

export default class SwitchBotLock extends Device<StatusBody, CommandBody> {
  /**
   * Rotate to locked position.
   */
  public lock = () => this.sendCommand("lock");

  /**
   * Rotate to unlocked position.
   */
  public unlock = () => this.sendCommand("unlock");
}
