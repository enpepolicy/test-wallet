// store.ts
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {
  //
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    //
  }
})
