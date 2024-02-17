import { Deps } from "../../types";
import { getMockedSceneExecuteResponse } from "../../utils/tests";
import Scene from "../Scene";

const sceneId = "sceneId";

let scene: Scene;
let deps: Deps;
let mockCommandResponse = getMockedSceneExecuteResponse({ sceneId });

beforeEach(() => {
  deps = {
    getRequest: jest.fn(),
    postRequest: jest.fn(),
  };
  scene = new Scene(sceneId, deps);
  mockCommandResponse = getMockedSceneExecuteResponse({ sceneId });
});

test("press", async () => {
  deps.postRequest = jest.fn().mockReturnValueOnce(mockCommandResponse);

  await scene.execute();

  expect(deps.getRequest).toBeCalledTimes(0);
  expect(deps.postRequest).toBeCalledTimes(1);
  expect(deps.postRequest).toBeCalledWith(
    `/v1.1/scenes/${sceneId}/execute`,
    {}
  );
});
