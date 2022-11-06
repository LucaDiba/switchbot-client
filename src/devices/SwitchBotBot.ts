import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPower } from "./Device.js";

export type GetDeviceBody = BaseDeviceGetDeviceBody;

export type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType: typeof DEVICE_TYPES.BOT;
};

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotBot extends DeviceWithPower<
  StatusBody,
  CommandBody
> {
  public press = () => this.sendCommand("press");
}
