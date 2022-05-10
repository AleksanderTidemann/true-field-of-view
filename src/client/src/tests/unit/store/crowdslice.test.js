import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "../../../store/configureStore";
import * as cs from "../../../store/slices/crowdsSlice";

describe("crowdsSlice", () => {
  let fakeAxios;
  let success = 200;
  let error = 500;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const crowdsSlice = () => store.getState().crowds;
  const createCrowdData = () => [
    { id: 1, key: "planets", data: [{ key: "neptune" }, { key: "jupiter" }] },
    { id: 2, key: "moons", data: [{ key: "io" }, { key: "titan" }] },
  ];

  // ACTIONS
  // loadCrowdData()
  describe("loading crowd data", () => {
    it("should add data from the server into crowdData property", async () => {
      const schema = createCrowdData();
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCrowdData());

      expect(crowdsSlice().crowdData).toMatchObject(schema);
    });
    it("should set the first item (0th index) of crowdData as currCrowd.", async () => {
      const schema = createCrowdData();
      const expectedResult = { ...schema[0] };
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCrowdData());

      expect(crowdsSlice().currCrowd).toMatchObject(expectedResult);
    });
    describe("error indicator", () => {
      it("should be false on successful response from server.", async () => {
        fakeAxios.onGet(cs.url).reply(success);
        await store.dispatch(cs.loadCrowdData());
        expect(crowdsSlice().isError).toBe(false);
      });
      it("should be true on error response from server", async () => {
        fakeAxios.onGet(cs.url).reply(error);
        await store.dispatch(cs.loadCrowdData());
        expect(crowdsSlice().isError).toBe(true);
      });
      it("should be false while fetching data from the server. ", async () => {
        fakeAxios.onGet(cs.url).reply(() => {
          expect(crowdsSlice().isError).toBe(false);
          return [success];
        });
        await store.dispatch(cs.loadCrowdData());
      });
    });
    describe("loading indicator", () => {
      it("should be true while fetching data from the server", async () => {
        fakeAxios.onGet(cs.url).reply(() => {
          expect(crowdsSlice().isLoading).toBe(true);
          return [success, {}];
        });
        await store.dispatch(cs.loadCrowdData());
      });
      it("should be false on successful response from server", async () => {
        fakeAxios.onGet(cs.url).reply(success, {});
        await store.dispatch(cs.loadCrowdData());
        expect(crowdsSlice().isLoading).toBe(false);
      });
      it("should be false on error response from server", async () => {
        fakeAxios.onGet(cs.url).reply(error, {});
        await store.dispatch(cs.loadCrowdData());
        expect(crowdsSlice().isLoading).toBe(false);
      });
    });
  });

  // loadCurrCrowd();
  describe("loading a new currCrowd", () => {
    it("should load a new currCrowd from crowdData and set currBody to an empty object", async () => {
      const schema = createCrowdData();
      const expectedResult = schema[1];
      fakeAxios.onGet(cs.url).reply(success, schema);

      await store.dispatch(cs.loadCrowdData());
      store.dispatch(cs.loadCurrCrowd(expectedResult.key));

      expect(crowdsSlice().currCrowd).toMatchObject(expectedResult);
      expect(crowdsSlice().currBody).toMatchObject({});
    });
  });

  // loadCurrBody();
  describe("loading a new currBody", () => {
    it("should set a new currBody from currCrowd if the new currBody is not equal the previous currBody", async () => {
      const schema = createCrowdData();
      const defaultState = {};
      fakeAxios.onGet(cs.url).reply(success, schema);
      await store.dispatch(cs.loadCrowdData());

      expect(crowdsSlice().currBody).toMatchObject(defaultState);

      const currCrowd = crowdsSlice().currCrowd;
      const newBody = currCrowd.data[0];
      store.dispatch(cs.loadCurrBody(newBody.key));

      expect(defaultState).not.toMatchObject(newBody);

      expect(crowdsSlice().currBody).toMatchObject(newBody);
    });
    it("should set the currBody to an empty object if the new currBody is equal to the previous currBody", async () => {
      const schema = createCrowdData();
      fakeAxios.onGet(cs.url).reply(success, schema);
      await store.dispatch(cs.loadCrowdData());
      const currCrowd = crowdsSlice().currCrowd;
      const newBody = currCrowd.data[0];
      store.dispatch(cs.loadCurrBody(newBody.key));

      expect(crowdsSlice().currBody).toMatchObject(newBody);

      store.dispatch(cs.loadCurrBody(newBody.key));

      expect(crowdsSlice().currBody).toMatchObject({});
    });
  });

  // resetCurrBody();
  describe("resetting the currBody", () => {
    it("should set the currBody to an empty object", async () => {
      const schema = createCrowdData();
      fakeAxios.onGet(cs.url).reply(success, schema);
      await store.dispatch(cs.loadCrowdData());

      const currCrowd = crowdsSlice().currCrowd;
      const newBody = currCrowd.data[0];
      store.dispatch(cs.loadCurrBody(newBody.key));

      expect(crowdsSlice().currBody).toMatchObject(newBody);

      store.dispatch(cs.resetCurrBody());

      expect(crowdsSlice().currBody).toMatchObject({});
    });
  });
});
