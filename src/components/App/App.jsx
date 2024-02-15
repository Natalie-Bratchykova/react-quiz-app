import { useEffect, useReducer } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Header } from "../Header";
import { Main } from "../Main";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return{...state, status:"error"};
    default:
      throw new Error("Action is unknown");
  }
};

const initialState = {
  questions: [],
  status: "loading",
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch on mount
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({type:"dataFailed"}));
  }, []);

  return (
    <>
      <Header />
      <Main>
        <hgroup className="progress-info">
          <h2>The progress</h2>
          <p>
            <span className="progress-current">1</span>/15
          </p>
          <p>
            Question <span className="progress-current">1</span>
          </p>
        </hgroup>
      </Main>
    </>
  );
}

export default App;