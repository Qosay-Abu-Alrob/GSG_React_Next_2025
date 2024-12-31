import { useState } from "react";
import Button from "./components/Buttons";

function App() {
  const [result, setResult] = useState("");
  const [isResultShown, setIsResultShown] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (isResultShown) {
      setResult(value);
      setIsResultShown(false);
    } else {
      setResult(result + value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-center text-5xl pt-10">Exercise 1 Calculator</h1>
      <div>
        <input className="EqualTextBox" type="text" readOnly value={result} />
      </div>
      <Button
        onClick={handleClick}
        result={result}
        setResult={setResult}
        setIsResultShown={setIsResultShown}
      />
    </div>
  );
}

export default App;
