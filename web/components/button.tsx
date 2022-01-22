import button from "../styles/button.module.css";

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...{
        ...props,
        className: button.button,
      }}
    >
      {props.children}
    </button>
  );
};
