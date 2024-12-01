import "./Header.css";
import sismiclogo from "../../assets/logo_sismic.png"

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={sismiclogo} alt="Logo" className="logo" />
        <h1 className="title">User List</h1>
      </div>
    </header>
  );
};

export default Header;
