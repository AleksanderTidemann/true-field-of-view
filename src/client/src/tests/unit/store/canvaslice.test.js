import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as cs from "../../../store/slices/canvasSlice";
import { mockFormData } from "../../utils/testdata";
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

  // ACTIONS
  // loadCanvasData()
  describe("loading canvas data", () => {
    it("should add same data to defaultData and userData if it's saved to the server.", async () => {
      // ARRANGE
      const schema = { id: 1 };
      fakeAxios.onGet(cs.url).reply(success, schema);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      // ASSERT
      expect(canvasSlice().userData).toMatchObject(schema);
      expect(canvasSlice().defaultData).toMatchObject(schema);
    });
    it("should not add schema to defaultData and userData if's not saved to the server", async () => {
      // ARRANGE
      const schema = { id: 1 };
      fakeAxios.onGet(cs.url).reply(error, schema);
      // ACT
      await store.dispatch(cs.loadCanvasData());
      // ASSERT
      expect(canvasSlice().userData).toMatchObject({});
      expect(canvasSlice().defaultData).toMatchObject({});
    });

    describe("error indicator", () => {
      it("should be false on successful respons from server", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(success);
        // ACT
        await store.dispatch(cs.loadCanvasData());
        // ASSERT
        expect(canvasSlice().isError).toBe(false);
      });
      it("should be false while fetching data from server", async () => {
        // ARRANGE
        fakeAxios.onGet(cs.url).reply(() => {
          // ASSERT
          expect(canvasSlice().isError).toBe(false);
          return [success];
        });
        // ACT
        await store.dispatch(cs.loadCanvasData());
      });
      it("should be true on error respons from server", async () => {
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
      const schema = { isEyepieceMode: true };
      fakeAxios.onGet(cs.url).reply(success, schema);
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
      const mode = true;
      const schema = { hasGrid: mode };
      fakeAxios.onGet(cs.url).reply(success, schema);

      // ACT
      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchGrid(!mode));

      expect(canvasSlice().userData.hasGrid).not.toBe(mode);
    });
    it("should make hasRedGrid false if hasGrid is false in userData", async () => {
      // ARRANGE
      const mode = true;
      const schema = { hasGrid: mode, hasRedGrid: mode };
      fakeAxios.onGet(cs.url).reply(success, schema);
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
      const schema = { hasRedGrid: mode };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchRedGrid(!mode));

      expect(canvasSlice().userData.hasRedGrid).not.toBe(mode);
    });
  });

  // switchLabel()
  describe("switching label", () => {
    it("should toggle hasLabels in userData", async () => {
      const mode = true;
      const schema = { hasLabels: mode };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.switchLabel(!mode));

      expect(canvasSlice().userData.hasLabels).not.toBe(mode);
    });
  });

  // zoomInn()
  describe("zooming inn", () => {
    it("should increment zoomValue by the zoomIncrement in userData", async () => {
      const inc = 10;
      const val = 50;
      const expectedResult = val + inc;
      const schema = { zoomIncrement: inc, zoomValue: val };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.zoomInn());

      expect(canvasSlice().userData.zoomValue).toBe(expectedResult);
    });
    it("should not have a zoomValue greater than 100", async () => {
      const inc = 10;
      const val = 95;
      const expectedResult = 100;
      const schema = { zoomIncrement: inc, zoomValue: val };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.zoomInn());

      expect(canvasSlice().userData.zoomValue).toBe(expectedResult);
    });
  });

  // zoomOut()
  describe("zooming out", () => {
    it("should de-increment zoomValue by the zoomIncrement in userData", async () => {
      const val = 50;
      const inc = 10;
      const expectedResult = val - inc;
      const schema = { zoomIncrement: inc, zoomValue: val };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.zoomOut());

      expect(canvasSlice().userData.zoomValue).toBe(expectedResult);
    });
    it("should not have zoomValue less than 10", async () => {
      const val = 15;
      const inc = 10;
      const expectedResult = 10;
      const schema = { zoomIncrement: inc, zoomValue: val };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.zoomOut());

      expect(canvasSlice().userData.zoomValue).toBe(expectedResult);
    });
  });

  // updateEyeCanvas()
  // updateCamCanvas()
  describe("update canvas size", () => {
    it("should produce correct plotsize x, y, and angular unit from eyepiece formData", async () => {
      const { formData, eyeResult } = mockFormData();
      const schema = { plotSizeX: 0, plotSizeY: 0, angularUnit: "" };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.updateEyeCanvas(formData));

      expect(canvasSlice().userData).toMatchObject(eyeResult);
    });
    it("should produce correct plotsize x, y, and angular unit from camera formdata", async () => {
      const { formData, camResult } = mockFormData();
      const schema = { plotSizeX: 0, plotSizeY: 0, angularUnit: "" };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCanvasData());
      store.dispatch(cs.updateCamCanvas(formData));

      expect(canvasSlice().userData).toMatchObject(camResult);
    });
  });

  // resetCanvasData()
  it("should overwrite the userData with the default data", async () => {
    const schema = { isEyepieceMode: true, hasLabels: true };
    fakeAxios.onGet(cs.url).reply(success, schema);

    await store.dispatch(cs.loadCanvasData());
    store.dispatch(cs.switchLabel(false));
    store.dispatch(cs.switchMode(false));
    store.dispatch(cs.resetCanvasData());

    expect(canvasSlice().defaultData).toMatchObject(canvasSlice().userData);
  });
});
