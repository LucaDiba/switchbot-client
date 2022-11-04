import { BaseDeviceStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type StatusBody = BaseDeviceStatusBody & {
  deviceType: typeof DEVICE_TYPES.LOCK;
  lockState: "LOCKED" | "UNLOCKED" | "JAMMED";
  doorState: string; // TODO: determine the literal ("CLOSED" | ???)
  calibrate: boolean;
};

type CommandBody = {};

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
