interface MyButtonProps {
  onClick?: () => void;
  title?: string;
  type: "button" | "submit";
  textColour?: string;
  btnVariant?: string;
  icon?: string;
}

const MyButton = ({
  onClick,
  title,
  type,
  textColour,
  btnVariant,
  icon,
}: MyButtonProps) => {
  return (
    <button
      type={type}
      className={
        "btn " +
        (btnVariant ? btnVariant : "btn-primary") +
        " " +
        (textColour ? textColour : "text-white")
      }
      onClick={onClick}
    >
      {icon && <span className="material-symbols-outlined">{icon}</span>}

      {title}
    </button>
  );
};

export default MyButton;
