"use strict";

import React, { PropTypes } from "react";

const Search = ({ handleSearch, isDisable }) => (
  <div className="search">
    <input
      type="search"
      placeholder="Pesquisar"
      onKeyUp={handleSearch}
      disabled={isDisable}
    />
    <button className="material-icons">person_search</button>
  </div>
);

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
};

export default Search;
