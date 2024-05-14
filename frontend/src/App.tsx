import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Notes } from "./components/notes/Notes";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Notes />} />
      </Routes>
    </FluentProvider>
  );
}

export default App;
