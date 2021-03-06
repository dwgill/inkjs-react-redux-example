import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector as useSelectorUntyped } from "react-redux";
import { getStory } from "../story/core";
import reducer from "./reducer";
import { connectStoryToReduxStore } from "./storyReduxConnection";
import storyReduxMiddleware from "./storyReduxMiddleware";

const createStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(storyReduxMiddleware.middleware),
  });

let store: ReturnType<typeof createStore>;
export const getStore = () => {
  if (store == null) {
    store = createStore();

    if (process.env.NODE_ENV === "development") {
      (window as any).store = store;
    }

    connectStoryToReduxStore(getStory(), store);
  }

  return store;
};

export type Store = typeof store;
export type Dispatch = Store["dispatch"];
export type ReduxState = ReturnType<typeof reducer>;
export const useSelector: TypedUseSelectorHook<ReduxState> = useSelectorUntyped;
