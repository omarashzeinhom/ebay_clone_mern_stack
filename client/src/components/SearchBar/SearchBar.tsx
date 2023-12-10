import "./SearchBar.scss";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
  return (
    <div className="app__searchbar">
      <a href="/">
        <img
          className="app__searchbar-logo"
          src="/ebaylogo.png"
          width={250}
          height={100}
          alt="searchbarlogo"
        />
      </a>

      <select name="Shop By Category" id="ShopByCategory" className="app__searchbar-form-dropDown">
        <option selected hidden>
          {" "}
          Shop By Category{" "}
        </option>
        <option> Category 1 </option>
        <option> Category 2 </option>
        <option> Category 3 </option>
      </select>

      <form className="app__searchbar-form">
        <div className="app__searchbar-formSearch">
          <input
            type="search"
            name="searchbar"
            className="app__searchbar-input"
            placeholder="Search for anything"
          />

          <select className="app__searchbar-form-dropDown">
            <option selected hidden>
              {" "}
              All Categories{" "}
            </option>
            <option> Category 1 </option>
            <option> Category 2 </option>
            <option> Category 3 </option>
          </select>
        </div>

        <button className=" app__searchbar-searchBtn">
          Search
          <HiMagnifyingGlass className="app__searchbar-searchicon" />
        </button>
      </form>
    </div>
  );
}
