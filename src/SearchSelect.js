import "./SearchSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SearchSelect = () => {
  const data = [
    {
      displayItem: "Apple",
      displayIcon: "apple-whole",
    },
    {
      displayItem: "Banana",
      displayIcon: "faAppleWhole",
    },
    {
      displayItem: "Strawberry",
      displayIcon: "faAppleWhole",
    },
    {
      displayItem: "Pineapple",
      displayIcon: "faAppleWhole",
    },
  ];
  const placeholderText= "Choose a Fruit:";
  const [isOpen, setSelectOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const filterItems = (e) => {
    const filterVal = e.currentTarget.value.toLowerCase();
    setFilteredItems(data.filter(item => item.displayItem.toLowerCase().includes(filterVal)));
  }
  return (
    <div className="search-select-box">
      <div
        role="button"
        className={`select-btn ${isOpen ? "hide" : ""}`}
        tabIndex="0"
        onClick={() => setSelectOpen(true)}
      >
        <div>{selectedVal === "" ? placeholderText : selectedVal}</div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <div className={`select-box-content ${isOpen ? "show" : ""}`}>
        <div className="select-input">
          <input
            type="text"
            placeholder={placeholderText}
            className="search-box"
            onKeyUp={filterItems}
          />
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <ul className="select-options-list">
          {filteredItems.map((item, index) => (
            <li
              className="select-options"
              key={index}
              onClick={() => {
                setSelectedVal(item.displayItem);
                setSelectOpen(false);
              }}
            >
              <FontAwesomeIcon icon={`fa-solid fa-${item.displayIcon}`} />
              <span>{item.displayItem}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
