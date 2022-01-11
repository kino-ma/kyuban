import button from "../styles/button.module.css";

export const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = (props) => {
  return (
    <button {...{ className: button.button, props }}>{props.children}</button>
  );
};
