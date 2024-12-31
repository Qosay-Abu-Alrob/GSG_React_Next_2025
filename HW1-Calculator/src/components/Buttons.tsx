interface IButtons {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setIsResultShown: React.Dispatch<React.SetStateAction<boolean>>;
}

function Button({ result, onClick, setResult, setIsResultShown }: IButtons) {
  const handleResult = () => {
    const calculate = eval(result);
    setResult(`${result}=${calculate}`);
    setIsResultShown(true);
  };

  return (
    <div className="grid grid-cols-3 w-42 gap-2">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((value) => (
        <input
          key={value}
          className="NumberingButton"
          type="button"
          value={value}
          onClick={onClick}
        />
      ))}
      {["+", "-"].map((value) => (
        <input
          key={value}
          className="OperationButton"
          type="button"
          value={value}
          onClick={onClick}
        />
      ))}
      <input
        className="EqualButton"
        type="button"
        value="="
        onClick={handleResult}
      />
    </div>
  );
}

export default Button;
