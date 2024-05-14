import { Text } from "@fluentui/react-components";
import { Link } from "react-router-dom";
import { NotePinRegular } from "@fluentui/react-icons";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logoArea">
        <NotePinRegular className="logo" />
        <Text
          as="h1"
          wrap={false}
          size={500}
          font="monospace"
          weight="bold"
          className="logoText"
        >
          NoteWave
        </Text>
      </div>
      <div>
        <Link to="./" className="navLink">
          My Notes
        </Link>
      </div>
    </div>
  );
};
