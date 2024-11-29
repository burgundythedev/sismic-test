import "./Header.css";
import sismiclogo from "../../assets/logo_sismic.png"

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={sismiclogo} alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;
