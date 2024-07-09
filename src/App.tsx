
import FavCountry from "./components/FavCountry";
import HaveBeenCountry from "./components/HaveBeenCountry";
import WantCountry from "./components/WantCountry";

function App() {
  return (
    <>
      <h2>내가 가고싶은 나라들</h2>
      <WantCountry />
      <HaveBeenCountry />
      <FavCountry />
    </>
  );
}

export default App;
