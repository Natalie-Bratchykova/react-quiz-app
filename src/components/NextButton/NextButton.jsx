export const NextButton = ({ answer, dispatch }) => {
  if (answer === null) return null;
  return (
    <button
      className="btn"
      onClick={() => {
        dispatch({ type: "nextQuestion" });
      }}
    >
      Next
    </button>
  );
};
