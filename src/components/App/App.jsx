import { useEffect, useReducer } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Header } from "../Header";
import { Main } from "../Main";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { StartScreen } from "../StartScreen/StartScreen";
import { Question } from "../Question/Question";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action is unknown");
  }
};

const initialState = {
  questions: [],
  status: "loading",
};
function App() {
  const [{ status, questions }, dispatch] = useReducer(reducer, initialState);

  // fetch on mount
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen questionsNum={questions.length} />}
        {status === "active" && <Question />}
      </Main>
    </>
  );
}

export default App;
