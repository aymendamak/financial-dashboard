interface MyButtonProps {
  onClick: () => void;
  title: string;
  type: "button" | "submit";
  textColour?: string;
  btnVariant?: string;
}

const MyButton = ({
  onClick,
  title,
  type,
  textColour,
  btnVariant,
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
      {title}
    </button>
  );
};

export default MyButton;
