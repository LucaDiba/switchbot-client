import { Deps, SceneExecuteResponse, SceneId } from "../types";
import { returnSceneExecuteBodyOrThrow } from "../utils/response";

export default class Scene {
  protected readonly _sceneId: SceneId;

  protected readonly _deps: Deps;

  constructor(sceneId: SceneId, deps: Deps) {
    this._sceneId = sceneId;
    this._deps = deps;
  }

  public async execute() {
    const res = await this._deps.postRequest<SceneExecuteResponse<{}>>(
      this._getPath("/execute"),
      {}
    );

    return returnSceneExecuteBodyOrThrow(res);
  }

  protected _getPath = (path: string) => {
    return `/v1.1/scenes/${this._sceneId}${path}`;
  };
}
