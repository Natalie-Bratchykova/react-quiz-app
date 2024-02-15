import "./style.scss";
export const NextButton = ({ answer, dispatch , finishCond }) => {
  if (answer === null) return null;
  return (
    <div className="button-wrapper">
      <button
        className="next-btn"
        onClick={() => {
          if(finishCond){
            dispatch({type:"finished"})
          }
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    </div>
  );
};
