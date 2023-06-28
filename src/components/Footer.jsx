import {Link} from "react-router-dom";
import "../styles/components/Footer.sass";

const Footer = () => {
  return (
    <aside id="Footer">
      <span>&copy; Youtube</span>
      <Link to="/search">
        <h5 className="all">Termos de uso</h5>
      </Link>

      <Link to="/search/channels">
        <h5 className="channels">Políticas de Privacidade</h5>
      </Link>
    </aside>
  );
}

export default Footer;
