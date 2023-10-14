import "./App.css";
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import CoinInfo from "./components/CoinInfo";
function App() {
  const [list, setList] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    console.log(searchValue);
  }
  useEffect(() => {
    const fetchAllCoinData = async () => {
      const crypoList = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      );
      const crypoListJson = await crypoList.json();
      setList(crypoListJson);
      console.log(crypoListJson);
    };
    fetchAllCoinData().catch(console.error);
  }, []);
  return (
    <>
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
  type="text"
  placeholder="Search..."
  onChange={(inputString) => searchItems(inputString.target.value)}
/>
        <ul>
          {list &&
            Object.entries(list.Data).map(([coin]) =>
              list.Data[coin].PlatformType === "blockchain" ? (
                <CoinInfo
                  key={coin}
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].CoinName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )}
        </ul>
      </div>
    </>
  );
}

export default App;
