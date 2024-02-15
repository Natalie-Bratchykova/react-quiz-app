import { Options } from "../Options/Options";
import "./style.scss";
export const Question = ({ question, dispatch, answer }) => {
  return (
    <div className="question">
      <h3 className="question--title">{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};
