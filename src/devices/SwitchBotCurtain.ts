import { BaseDeviceStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type StatusBody = BaseDeviceStatusBody & {
  deviceType: typeof DEVICE_TYPES.BOT;
};

type CommandBody = {};

enum SetPositionMode {
  PERFORMANCE = "0",
  SILENT = "1",
  DEFAULT = "ff",
}

export default class SwitchBotCurtain extends Device<StatusBody> {
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

    return this.sendCommand<CommandBody>("setPosition", parameter);
  };

  /**
   * Open the curtain (equivalent to set position to 0).
   */
  public open = () => this.sendCommand<CommandBody>("turnOn");

  /**
   * Close the curtain (equivalent to set position to 100).
   */
  public close = () => this.sendCommand<CommandBody>("turnOff");
}

export type SwitchBotCurtainStatusBody = StatusBody;
export type SwitchBotCurtainCommandBody = CommandBody;
