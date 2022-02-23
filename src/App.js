import "./App.css";
import { SearchSelect } from "./components/SearchSelect/SearchSelect";
import mockData from "./mockData.json";

function App() {
  return (
    <div className="App">
      <div>Smart combo box component</div>
      <SearchSelect data={mockData} placeholderText="Choose a Fruit:" />
    </div>
  );
}

export default App;
