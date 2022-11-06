import { BaseDeviceStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type StatusBody = BaseDeviceStatusBody & {
  deviceType: typeof DEVICE_TYPES.LOCK;
  lockState: "locked" | "unlocked" | "jammed";
  doorState: "closed" | "opened";
  calibrate: boolean;
};

type CommandBody = {
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
export default class SwitchBotLock extends Device<StatusBody> {
  /**
   * Rotate to locked position
   */
  public lock = () => this.sendCommand<CommandBody>("lock");

  /**
   * Rotate to unlocked position
   */
  public unlock = () => this.sendCommand<CommandBody>("unlock");
}

export type SwitchBotLockStatusBody = StatusBody;
export type SwitchBotLockCommandBody = CommandBody;
