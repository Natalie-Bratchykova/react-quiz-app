import { useEffect } from "react";

export const Timer = ({ seconds, dispatch }) => {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes < 10 && "0"}
      {minutes}:{secs < 10 && "0"}
      {secs}
    </div>
  );
};
