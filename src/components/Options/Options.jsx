import "./style.scss";
export const Options = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((el, i) => (
        <button
          className={`btn ${i === answer ? "--active" : ""} ${
            answer !== null
              ? i === question.correctOption - 1
                ? "--correct"
                : "--wrong"
              : ""
          }`}
          disabled={answer !== null}
          key={i}
          onClick={() => {
            dispatch({
              type: "newAnswer",
              payload: i,
            });
          }}
        >
          {el}
        </button>
      ))}
    </div>
  );
};
