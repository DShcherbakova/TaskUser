// import TaskList from "./components/TaskList";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import TaskList from "./components/TaskList";
import UserList from "./components/UserList";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<TaskList />}></Route>
      <Route path="/users" element={<UserList />}></Route>
      </Route>
    </Routes>
  )
}

export default App;
