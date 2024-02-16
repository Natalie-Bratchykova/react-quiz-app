import { useEffect, useReducer } from "react";
import "./App.css";
import { Header } from "../Header";
import { Main } from "../Main";
import { Loader } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { StartScreen } from "../StartScreen/StartScreen";
import { Question } from "../Question/Question";
import { NextButton } from "../NextButton/NextButton";
import { Progress } from "../Progress/Progress";
import { FinishScreen } from "../FinishScreen/FinishScreen";
import { Footer } from "../Footer/Footer";
import { Timer } from "../Timer/Timer";
const SECONDS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
  secondRemaining: 10,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption - 1
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return { ...state, status: "finish" };
    case "Restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "timer":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action is unknown");
  }
};

function App() {
  const [
    { status, questions, index, answer, points, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const allPoints = questions.reduce((acc, el) => (acc += el.points), 0);

  const finishCondition = index === questions.length - 1;
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
            <Progress
              index={index}
              questions={questions}
              answer={answer}
              currentPoints={points}
              allPoints={allPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer seconds={secondRemaining} dispatch={dispatch} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                finishCond={finishCondition}
              />
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            score={points}
            maxPoints={allPoints}
            dispatch={dispatch}
            questions={questions}
            index={index}
          />
        )}
      </Main>
    </>
  );
}

export default App;
