import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

const MultiSelect = ({
  techStack,
  settechStack,
}: {
  techStack: string;
  settechStack: (techStack: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState<string[]>([]);

  // Run this effect only once when the component mounts
  useEffect(() => {
    if (techStack !== "") {
      setItems(techStack.split(","));
    }
  }, [techStack]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setItems((prevItems) => [...prevItems, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Run this effect whenever items change
  useEffect(() => {
    settechStack(items.join(","));
  }, [items, settechStack]);

  return (
    <div className="w-full mt-3">
      <div className="mb-4 w-full">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-800 inline-flex items-center m-1 px-2 py-1 rounded"
          >
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="ml-2 text-blue-800 hover:text-blue-900"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="w-full px-3 py-2 border rounded"
        placeholder="Type and press Enter to add"
      />
    </div>
  );
};

export default MultiSelect;
