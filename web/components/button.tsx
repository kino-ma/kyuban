import button from "../styles/button.module.css";

export const Button: React.FC = ({ children, ...props }) => {
  return (
    <button className={button.button} {...props}>
      {children}
    </button>
  );
};
