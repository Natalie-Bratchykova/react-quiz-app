import { useEffect, useReducer } from "react";
import "./App.css";
import { Header } from "../Header";
import { Main } from "../Main";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { StartScreen } from "../StartScreen/StartScreen";
import { Question } from "../Question/Question";
import { NextButton } from "../NextButton/NextButton";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption - 1
            ? state.points + question.points
            : 0,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("Action is unknown");
  }
};

const initialState = {
  questions: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
};
function App() {
  const [{ status, questions, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
        {status === "ready" && (
          <StartScreen questionsNum={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton answer={answer} dispatch={dispatch} />
          </>
        )}
      </Main>
    </>
  );
}

export default App;
