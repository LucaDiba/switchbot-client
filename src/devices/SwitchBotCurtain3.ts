import { DEVICE_TYPES } from "../utils/constant";
import {
  GetDeviceBodyCurtainBase,
  SwitchBotCurtainBase,
} from "./SwitchBotCurtain";

type DeviceType = typeof DEVICE_TYPES.CURTAIN_3;

export type GetDeviceBody = GetDeviceBodyCurtainBase<DeviceType>;

export default class SwitchBotCurtain3 extends SwitchBotCurtainBase<DeviceType> {}
