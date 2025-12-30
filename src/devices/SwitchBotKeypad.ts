import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType = typeof DEVICE_TYPES.KEYPAD | typeof DEVICE_TYPES.KEYPAD_TOUCH;

type KeypadKey = {
  id: number;
  name: string;
  type: "permanent" | "timeLimit" | "disposable" | "urgent";
  password: string;
  iv: string;
  status: "normal" | "expired";
  createTime: number;
};

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType> & {
  lockDeviceId: string;
  keyList: KeypadKey[];
};

export type StatusBody = BaseDeviceStatusBody<DeviceType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotKeypad extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {
  /**
   * Create a new passcode.
   */
  public createKey = (
    params:
      | {
          name: string;
          type: "permanent" | "urgent";
          password: string;
        }
      | {
          name: string;
          type: "timeLimit" | "disposable";
          password: string;
          startTime: Date;
          endTime: Date;
        },
  ) => {
    const { name, type, password } = params;

    if (params.type === "permanent" || params.type === "urgent") {
      return this.sendCommand("createKey", {
        name,
        type,
        password,
      });
    } else if (params.type === "timeLimit" || params.type === "disposable") {
      const { startTime, endTime } = params;
      return this.sendCommand("createKey", {
        name,
        type,
        password,
        startTime: startTime.getTime(),
        endTime: endTime.getTime(),
      });
    }

    throw new Error("Invalid type");
  };

  /**
   * Delete an existing passcode.
   */
  public deleteKey = (id: number) => this.sendCommand("deleteKey", { id });
}
