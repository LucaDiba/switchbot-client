import { DEVICE_TYPES } from "../utils/constant";
import { SwitchBotCurtainBase } from "./SwitchBotCurtain";

type DeviceType = typeof DEVICE_TYPES.CURTAIN_3;

export default class SwitchBotCurtain3 extends SwitchBotCurtainBase<DeviceType> {}
