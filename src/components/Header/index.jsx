import reactLogo from "../../assets/react.svg";
import "./style.scss";
export const Header = () => {
  return (
    <header className="app-header">
      <img src={reactLogo} alt="react logo" />
      <h1 className="app-header__title">React Quiz App</h1>
    </header>
  );
};
