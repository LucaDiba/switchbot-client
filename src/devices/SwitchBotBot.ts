import { BaseDeviceWithPowerStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPower } from "./Device.js";

type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType: typeof DEVICE_TYPES.BOT;
};

type CommandBody = {};

export default class SwitchBotBot extends DeviceWithPower<
  StatusBody,
  CommandBody
> {
  public press = () => this.sendCommand<CommandBody>("press");
}

export type SwitchBotBotStatusBody = StatusBody;
export type SwitchBotBotCommandBody = CommandBody;
