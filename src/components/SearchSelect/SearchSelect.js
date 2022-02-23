import "./SearchSelect.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const SearchSelect = ({ data, placeholderText }) => {
  const [isOpen, setSelectOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);

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
    <div className="search-select">
      <div
        role="button"
        className={`search-select__btn ${isOpen ? "hide" : ""}`}
        tabIndex="0"
        onClick={() => setSelectOpen(true)}
      >
        <div className="search-select__selected-value">
          {selectedVal === "" ? (
            <span className="search-select__placeholder-text">{placeholderText}</span>
          ) : (
            selectedVal
          )}
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      {isOpen && (
        <div className={`search-select__content ${isOpen ? "focused" : ""}`}>
          <div className="search-select__select-input">
            <input
              type="text"
              autoFocus
              placeholder={placeholderText}
              className="search-select__input"
              onKeyUp={filterItems}
            />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <ul className="search-select__options-list">
            {filteredItems.map((item, index) => (
              <li
                className="search-select__options"
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
      )}
    </div>
  );
};
