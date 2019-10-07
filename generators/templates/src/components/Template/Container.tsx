import * as Domain from "@app/domain";
import * as React from "react";
import * as Counter from "../Counter";
import { generateStore, Store } from "./Store";
import * as Template from "./Template";

const generateProps = (stores: Domain.Stores, store: Store): Template.Props => {
  return {
    Counter: <Counter.Container store={store.counter} />,
  };
};

export const Container = ({ reducers }: { reducers: Domain.Reducers }) => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const domainStores: Domain.Stores = {
    app: createReducer(React.useReducer(...reducers.app)),
  };
  const viewStore = generateStore(domainStores);
  return <Template.Component {...generateProps(domainStores, viewStore)} />;
};
