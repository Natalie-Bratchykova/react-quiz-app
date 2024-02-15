import "./style.scss";
export const Progress = ({
  index,
  questions,
  currentPoints,
  allPoints,
  answer,
}) => {
  return (
    <header className="progress">
      <div className="progress__bar">
        {questions.map((el, i) => (
          <span
            key={i}
            className={`progress__item ${
              i < (answer !== null ? index + 1 : index) ? "passed" : ""
            }`}
          >
            {i}
          </span>
        ))}
      </div>
      <div className="progress__info">
        <p>
          Question <strong>{index + 1}</strong>/{questions.length}
        </p>
        <p>
          <strong>{currentPoints}</strong>/{allPoints} points
        </p>
      </div>
    </header>
  );
};
