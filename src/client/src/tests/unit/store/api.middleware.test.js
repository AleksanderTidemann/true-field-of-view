import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import api from "../../../store/api/api-middleware";
import {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from "../../../store/api/api-actions";

describe("api middleware", () => {
  let fakeStore;
  let fakeAxios;
  let fakeAxiosReply;
  let success = 200;
  let error = 500;
  let url = "/test";

  const createFakeStore = () => {
    // set up a fake store and middleware
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = async action => api(store)(next)(action);
    return { store, next, invoke };
  };

  beforeEach(() => {
    fakeStore = createFakeStore();
    fakeAxios = new MockAdapter(axios);
    fakeAxiosReply = jest.fn();
  });

  describe("intercepting actions with type of apiCallBegan", () => {
    it("should dispatch onStart action if specified", async () => {
      fakeAxios.onGet(url).reply(success);

      const { store, next, invoke } = fakeStore;
      const specialStart = "specialStart";
      const action = apiCallBegan({ url, onStart: specialStart });

      await invoke(action);

      const firstCall = store.dispatch.mock.calls[0];
      const firstCallFirstArg = firstCall[0];

      // The first arg of the first call to the function was 'first arg'
      expect(firstCallFirstArg.type).toBe(specialStart);
    });

    it("should make server request on specified url", async () => {
      fakeAxios.onGet(url).reply(() => [success, fakeAxiosReply()]);

      const { next, invoke } = fakeStore;
      const action = apiCallBegan({ url });

      await invoke(action);

      expect(next).toHaveBeenCalledWith(action);
      expect(fakeAxiosReply.mock.calls.length).toBe(1);
    });

    describe("on successful reply from server", () => {
      it("should only dispatch general onSuccess action if no specific onSuccess action is specified", async () => {
        fakeAxios.onGet(url).reply(success, {});
        const { store, invoke } = fakeStore;
        const generalSuccess = apiCallSuccess();
        const action = apiCallBegan({ url });

        await invoke(action);

        // general success dispatch
        const dispatches = store.dispatch.mock.calls;
        const firstDispatch = dispatches[0];
        const firstDispatchFirstArg = firstDispatch[0];

        expect(dispatches.length).toBe(1);
        expect(firstDispatchFirstArg.type).toBe(generalSuccess.type);
      });

      it("should dispatch general and specific onSuccess action if specific onSuccess action specified", async () => {
        fakeAxios.onGet(url).reply(success, {});
        const { store, invoke } = fakeStore;
        const generalSuccess = apiCallSuccess();
        const specificSuccessType = "specificSuccessType";
        const action = apiCallBegan({ url, onSuccess: specificSuccessType });

        await invoke(action);

        const dispatches = store.dispatch.mock.calls;
        // general success dispatch
        const firstDispatch = dispatches[0];
        const firstDispatchFirstArg = firstDispatch[0];
        expect(firstDispatchFirstArg.type).toBe(generalSuccess.type);

        // specific success dispatch
        const secondDispatch = dispatches[1];
        const secondDispatchFirstArg = secondDispatch[0];
        expect(secondDispatchFirstArg.type).toBe(specificSuccessType);

        expect(dispatches.length).toBe(2);
      });
    });

    describe("on failed reply from server", () => {
      it("should only dispatch general onError action if no specific onError action is specified", async () => {
        fakeAxios.onGet(url).reply(error, {});
        const { store, invoke } = fakeStore;
        const generalError = apiCallFailed();
        const action = apiCallBegan({ url });

        await invoke(action);

        // general error dispatch
        const dispatches = store.dispatch.mock.calls;
        const firstDispatch = dispatches[0];
        const firstDispatchFirstArg = firstDispatch[0];

        expect(dispatches.length).toBe(1);
        expect(firstDispatchFirstArg.type).toBe(generalError.type);
      });

      it("should dispatch general and specific onError action if specific onError action is specified", async () => {
        fakeAxios.onGet(url).reply(error, {});
        const { store, invoke } = fakeStore;
        const generalError = apiCallFailed();
        const specificErrorType = "specificError";
        const action = apiCallBegan({ url, onError: specificErrorType });

        await invoke(action);

        const dispatches = store.dispatch.mock.calls;

        // general error dispatch
        const firstDispatch = dispatches[0];
        const firstDispatchFirstArg = firstDispatch[0];
        expect(firstDispatchFirstArg.type).toBe(generalError.type);

        // specific error dispatch
        const secondDispatch = dispatches[1];
        const secondDispatchFirstArg = secondDispatch[0];
        expect(secondDispatchFirstArg.type).toBe(specificErrorType);

        expect(dispatches.length).toBe(2);
      });
    });
  });

  describe("intercepting actions with type not of apiCallBegan", () => {
    it("should not make request to server", async () => {
      fakeAxios.onGet(url).reply(() => [success, fakeAxiosReply()]);
      const { invoke } = fakeStore;
      const action = { type: "OTHER", payload: { url } };

      await invoke(action);

      expect(fakeAxiosReply).not.toHaveBeenCalled();
    });
  });

  // in either case..
  it("should call next with action", async () => {
    fakeAxios.onGet(url).reply(success);
    const { next, invoke } = fakeStore;
    const action = apiCallBegan({ url });

    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(next.mock.calls.length).toBe(1);
  });
});
