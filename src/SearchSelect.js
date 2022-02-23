import "./SearchSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

export const SearchSelect = ({ data, placeholderText }) => {
  const [isOpen, setSelectOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const textInput = useRef(null);

  const filterItems = (e) => {
    const filterVal = e.currentTarget.value.toLowerCase();
    setFilteredItems(
      data.filter((item) => item.displayItem.toLowerCase().includes(filterVal))
    );
  };
  const getFAIcon = (icon) => {
    switch (icon) {
      case "apple-whole":
        return faAppleWhole;
      case "lemon":
        return faLemon;
      case "carrot":
        return faCarrot;
      case "pepper":
        return faPepperHot;
      default:
        return faAppleWhole;
    }
  };

  return (
    <div className="search-select-box">
      <div
        role="button"
        className={`select-btn ${isOpen ? "hide" : ""}`}
        tabIndex="-1"
        onClick={() => {
          textInput.current.focus();
          setSelectOpen(true);
        }}
      >
        <div className="selected-value">
          {selectedVal === "" ? (
            <span className="placeholder-text">{placeholderText}</span>
          ) : (
            selectedVal
          )}
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <div className={`select-box-content ${isOpen ? "show focused" : ""}`}>
        <div className="select-input">
          <input
            type="text"
            autoFocus={isOpen}
            placeholder={placeholderText}
            className="search-box"
            onKeyUp={filterItems}
            ref={textInput}
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
              <FontAwesomeIcon icon={getFAIcon(item.displayIcon)} />
              <span>{item.displayItem}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
