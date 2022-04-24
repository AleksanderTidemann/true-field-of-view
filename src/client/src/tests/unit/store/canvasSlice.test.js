import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as cs from "../../../store/slices/canvasSlice";
import configureStore from "../../../store/configureStore";

describe("canvasSlice", () => {
  let fakeAxios;
  let success = 200;
  let error = 500;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const canvasSlice = () => store.getState().canvas;
  const createCanvasSlice = () => ({
    lastFetch: 0,
    isLoading: false,
    isError: false,
    defaultData: {},
    userData: {},
  });
  // the data that is returned from the server:
  const createSchema = () => ({
    isEyepieceMode: true,
    hasGrid: true,
    hasRedGrid: false,
    hasLabels: true,
    redGridFactor: 6,
    zoomValue: 50,
    zoomIncrement: 10,
    plotSizeX: 20,
    plotSizeY: 20,
    angularUnit: "Minutes of Arc",
  });

  // ACTIONS
  describe("loading canvas data", () => {
    it("should add schema to defaultData and userData if it's saved to the server.", async () => {
      // ARRANGE
      const schema = createSchema();
      const expectedResult = createCanvasSlice();
      expectedResult.userData = { ...schema };
      expectedResult.defaultData = { ...schema };

      fakeAxios.onGet(cs.url).reply(success, schema);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      // ASSERT
      expect(canvasSlice()).toEqual(expectedResult);
    });
    it("should not add schema to defaultData and userData if's not saved to the server", async () => {
      // ARRANGE
      const expectedResult = createCanvasSlice();
      expectedResult.isError = true;
      fakeAxios.onGet(cs.url).reply(error);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      // ASSERT
      expect(canvasSlice()).toEqual(expectedResult);
    });

    describe("error indicator", () => {
      it("should be false if server responds with success", async () => {
        // ARRANGE
        const newData = createSchema();
        fakeAxios.onGet(cs.url).reply(success, newData);
        // ACT
        await store.dispatch(cs.loadCanvasData());
        // ASSERT
        expect(canvasSlice().isError).toBe(false);
      });
      it("should be false while fetching data from server", async () => {
        // ARRANGE
        const newData = createSchema();
        fakeAxios.onGet(cs.url).reply(() => {
          // ASSERT
          expect(canvasSlice().isError).toBe(false);
          return [success, newData];
        });

        // ACT
        await store.dispatch(cs.loadCanvasData());
      });
      it("should be true if server responds with error", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(error);
        // ACT
        await store.dispatch(cs.loadCanvasData());
        // ASSERT
        expect(canvasSlice().isError).toBe(true);
      });
    });

    describe("loading indicator", () => {
      it("should be true while fetching data from server", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(() => {
          // ASSERT
          expect(canvasSlice().isLoading).toBe(true);
          return [success];
        });
        // ACT
        await store.dispatch(cs.loadCanvasData());
      });
      it("should be false if server responds with success", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(success);
        // ACT
        await store.dispatch(cs.loadCanvasData());
        // ASSERT
        expect(canvasSlice().isLoading).toBe(false);
      });
      it("should be false if server responds with error", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(error);
        // ACT
        await store.dispatch(cs.loadCanvasData());
        // ASSERT
        expect(canvasSlice().isLoading).toBe(false);
      });
    });
  });

  // switchMode()
  describe("switching mode", () => {
    it("should toggle isEyepieceMode in defaultData and userData", async () => {
      // ARRANGE
      const mode = true;
      const state = createCanvasSlice();
      state.userData.isEyepieceMode = mode;
      state.defaultData.isEyepieceMode = mode;
      fakeAxios.onGet(cs.url).reply(success, state);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchMode(!mode));
      // ASSERT
      expect(canvasSlice().userData.isEyepieceMode).not.toBe(mode);
      expect(canvasSlice().defaultData.isEyepieceMode).not.toBe(mode);
    });
  });

  // switchGrid()
  describe("switching grid", () => {
    it("should toggle hasGrid in userData", async () => {
      // ARRANGE
      const mode = false;
      const state = createCanvasSlice();
      state.userData.hasGrid = mode;
      fakeAxios.onGet(cs.url).reply(success, state);

      // ACT
      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchGrid(!mode));

      expect(canvasSlice().userData.hasGrid).not.toBe(mode);
    });
    it("should make hasRedGrid false if hasGrid is false in userData", async () => {
      // ARRANGE
      const mode = true;
      const state = createCanvasSlice();
      state.userData.hasGrid = mode;
      state.userData.hasRedGrid = mode;
      fakeAxios.onGet(cs.url).reply(success, state);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchGrid(!mode));
      // ASSERT
      expect(canvasSlice().userData.hasRedGrid).not.toBe(mode);
    });
  });

  // switchRedGrid()
  describe("switching reduced gridlines", () => {
    it("should toggle hasRedGrid in userData", async () => {
      const mode = false;
      const state = createCanvasSlice();
      state.userData.hasRedGrid = mode;
      fakeAxios.onGet(cs.url).reply(success, state);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchRedGrid(!mode));

      expect(canvasSlice().userData.hasRedGrid).not.toBe(mode);
    });
  });

  // switchLabel
  describe("switching label", () => {
    it("should toggle hasLabels in userData", async () => {
      const mode = true;
      const state = createCanvasSlice();
      state.userData.hasLabels = mode;
      fakeAxios.onGet(cs.url).reply(success, state);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchLabel(!mode));

      expect(canvasSlice().userData.hasLabels).not.toBe(mode);
    });
  });

  describe("zooming inn", () => {
    it("should increment zoomValue in userData by the zoomIncrement", () => {
      const state = createCanvasSlice();
      state.userData.zoomIncrement = 10;
      state.userData.zoomValue = 50;

      store.dispatch(cs.zoomInn());

      //   expect(canvasSlice().userData.hasLabels).toBe(true);
    });
    it("should set zoomValue in userData to 100% if increment renders zoomValue higher than 100", () => {});
  });

  // zoomInn
  // zoomOut
  // updateCanvasSize
  // resetCanvasData
});
