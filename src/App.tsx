import "./App.css";
import Header from "./components/Header/Header";
import UsersTable from "./components/Users/UsersTable";

function App() {
  return (
    <div className="App">
      <Header/>
      <UsersTable />
    </div>
  );
}

export default App;
