import React, { useState } from "react";

function App() {
  const [cuntray, setCuntray] = useState([]);
  const [selected, setSelected] = useState(null);

  function handlerSelectCuntray(Iso3) {
    setSelected(Iso3);
  }

  function handlerRemoveTags() {
    setSelected(null);
  }

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar
          setCuntray={setCuntray}
          selected={selected}
          onRemoverTag={handlerRemoveTags}
        />
        <CuntrayLis
          cuntray={cuntray}
          selected={selected}
          onSelectedCuntray={handlerSelectCuntray}
        />
      </div>
    </div>
  );
}

function SearchBar({ setCuntray, selected, onRemoverTag }) {
  const [qurey, setQurey] = useState("");

  const fetchData = (value) => {
    fetch(`https://countriesnow.space/api/v0.1/countries/iso`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const result = json.data.filter((cuntray) => {
          return (
            value &&
            cuntray &&
            cuntray.name &&
            cuntray.name.toLowerCase().includes(value)
          );
        });
        setCuntray(result);
      });
  };

  const handelChange = (value) => {
    setQurey(value);
    fetchData(value);
  };

  return (
    <div className="input-container">
      {selected ? (
        <Selected selected={selected} onRemoverTag={onRemoverTag} />
      ) : (
        ""
      )}
      <input
        placeholder="Search by Country..."
        value={qurey}
        onChange={(e) => handelChange(e.target.value)}
      />
    </div>
  );
}

function CuntrayLis({ cuntray, onSelectedCuntray }) {
  return (
    <div className="list-cuntray">
      {cuntray.map((cuntray) => {
        return (
          <div
            onClick={() => onSelectedCuntray(cuntray.name)}
            key={cuntray.Iso3}
          >
            {cuntray.name}
          </div>
        );
      })}
    </div>
  );
}

function Selected({ selected, onRemoverTag }) {
  return (
    <span className="tags">
      {selected} <span onClick={onRemoverTag}>&times;</span>
    </span>
  );
}

export default App;
