function createStore(reducer) {
  let state;

  function dispatch(action) {
    state = reducer(state, action);
    render();
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
  };
}

function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { count: state.count + 1 };

    default:
      return state;
  }
}

function render() {
  let container = document.getElementById("container");
  container.textContent = store.getState().count;
}

let store = createStore(reducer); // createStore takes the reducer as an argument
store.dispatch({ type: "@@INIT" });
let button = document.getElementById("button");

button.addEventListener("click", () => {
  store.dispatch({ type: "counter/increment" });
});

// As you see above, createStore takes the reducer as the argument. 
// This sets the new store's reducer as reducer. 
// When an action is dispatched, it calls the reducer that we passed through when 
// creating the store.