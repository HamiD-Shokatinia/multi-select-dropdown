import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import "./DropDown.scss"; // Import your Sass file for styling
import arrowUp from "../asset/arrowUp.svg";

const initialItems: string[] = [
  "Education",
  "Yeeeah, science!",
  "Art",
  "Sport",
  "Games",
  "Health",
  "History",
  "Programming",
  "Machine Learning",
  "Devops",
  "Network",
];
const MultiSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [listItems, setListItems] = useState<string[]>(initialItems);
  const [inputValue, setInputValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const newItem = inputValue.trim();
      if (!listItems.includes(newItem)) {
        setListItems([...listItems, newItem]);
      }
      setInputValue(""); // Clear the input field after adding the item
    }
  };
  

  const handleItemClick = (item: string): void => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="multiselect-container" ref={dropdownRef}>
      <div className="selected-items" onClick={toggleDropdown}>
        <div className="input-container">
          <input
            type="text"
            value={inputValue} // Use inputValue state to reflect the typed text
            className="inp"
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="Type and press Enter"
          />
          <div className="arrow" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
            <img src={arrowUp} width={35} alt="arrow" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-menu">
            {listItems.map((item) => (
              <div key={item} className={`dropdown-item${selectedItems.includes(item) ? " selected" : ""}`} onClick={() => handleItemClick(item)}>
                {item}
                {selectedItems.includes(item) && <div> ✔️</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
