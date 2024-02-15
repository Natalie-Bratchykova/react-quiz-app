import "./style.scss";

export const FinishScreen = ({ score, maxPoints, dispatch, questions }) => {
  function addRecommendation() {
    if (score < maxPoints) {
      return "You have a room to improve your skills😉";
    } else {
      return "You're amazing, but don't stop on it😉";
    }
  }

  let percentage = Math.ceil((score / maxPoints) * 100);
  return (
    <div className="finish-massage">
      Your score is <span>{score}</span> points out of {maxPoints} ({percentage}{" "}
      %)
      <p>{addRecommendation()}</p>
      <button
        onClick={() => {
          dispatch({
            type: "Restart",
          });
        }}
      >
        Re-start test
      </button>
    </div>
  );
};
