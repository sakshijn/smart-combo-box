import "./SearchSelect.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAppleWhole,
  faLemon,
  faCarrot,
  faPepperHot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

export const SearchSelect = ({ data, placeholderText }) => {
  const [isOpen, setSelectOpen] = useState(false);
  const [selectedVal, setSelectedVal] = useState("");
  const [filteredItems, setFilteredItems] = useState(data);
  const [inputVal, setInputVal] = useState("");
  const ref = useRef(null);

  const handleHideDropdown = (event) => {
    if (event.key === "Escape") {
      setSelectOpen(false);
    }
  };

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  },[]);

  const filterItems = (e) => {
    const filterVal = e.currentTarget.value.toLowerCase();
    setFilteredItems(
      data.filter((item) => item.displayItem.toLowerCase().includes(filterVal))
    );
    setInputVal(filterVal);
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
            <span className="search-select__placeholder-text">
              {placeholderText}
            </span>
          ) : (
            selectedVal
          )}
        </div>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      {isOpen && (
        <CSSTransition in={isOpen} timeout={300} classNames="content" appear>
          <div ref={ref} className={`search-select__content ${isOpen ? "focused" : ""}`}>
            <div className="search-select__select-input">
              <input
                type="text"
                autoFocus
                placeholder={placeholderText}
                className="search-select__input"
                onChange={filterItems}
                value={inputVal}
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
        </CSSTransition>
      )}
    </div>
  );
};
