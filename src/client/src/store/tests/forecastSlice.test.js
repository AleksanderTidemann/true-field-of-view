import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "../configureStore";
import * as fc from "../slices/forecastSlice";
import userCoords from "../../utils/testdata";

describe("forecastSlice", () => {
  let fakeAxios;
  let success = 200;
  let error = 500;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const forecastSlice = () => store.getState().forecast;

  // loadForecast()
  describe("load forecast data", () => {
    it("should load data from the server into data property", async () => {
      const schema = { id: 1, key: 2 };
      fakeAxios.onPost(fc.url).reply(success, schema);

      await store.dispatch(fc.loadForecast(userCoords));

      expect(forecastSlice().data).toMatchObject(schema);
    });

    describe("error indicators", () => {
      it("should be false on successful respons from server", async () => {
        fakeAxios.onPost(fc.url).reply(success);

        await store.dispatch(fc.loadForecast(userCoords));

        expect(forecastSlice().isError).toBe(false);
      });
      it("should be false while fetching data from server", async () => {
        fakeAxios.onPost(fc.url).reply(() => {
          expect(forecastSlice().isError).toBe(false);
          return [success];
        });

        await store.dispatch(fc.loadForecast(userCoords));
      });
      it("should be true on error respons from server", async () => {
        fakeAxios.onPost(fc.url).reply(error);

        await store.dispatch(fc.loadForecast(userCoords));

        expect(forecastSlice().isError).toBe(true);
      });
    });

    describe("loading indicators", () => {
      it("should be true while fetching data from server", async () => {
        fakeAxios.onPost(fc.url).reply(() => {
          expect(forecastSlice().isLoading).toBe(true);
          return [success];
        });

        await store.dispatch(fc.loadForecast(userCoords));
      });
      it("should be false if server responds with success", async () => {
        fakeAxios.onPost(fc.url).reply(success);

        await store.dispatch(fc.loadForecast(userCoords));

        expect(forecastSlice().isLoading).toBe(false);
      });
      it("should be false if server responds with error", async () => {
        fakeAxios.onPost(fc.url).reply(error);

        await store.dispatch(fc.loadForecast(userCoords));

        expect(forecastSlice().isLoading).toBe(false);
      });
    });
  });
});
