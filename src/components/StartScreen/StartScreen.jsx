export const StartScreen = ({ questionsNum, dispatch }) => {
  function handleClick() {
    dispatch({ type: "start" });
  }
  return (
    <hgroup className="start">
      <h2>Welcome to the React Quiz App!</h2>
      <h3> {questionsNum} questions to test your Japanese knowledge </h3>
      <button onClick={handleClick}>始めましょう</button>
    </hgroup>
  );
};
