import { Link } from "react-router-dom";
import "../styles/components/Navbar.sass"
import UserMenu from "./UserMenu";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {    
    const hideSearch = event => {
        const Search = document.querySelector(".SearchModal");
        Search.classList.remove('show');
    };  
    
    return (
        <aside id="Navbar">
            <div className="Container">
                <Link to="/" style={{textDecoration:"none"}}>
                    <div className="Logo">
                        <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="" />
                    </div>
                </Link>

                <div className="Wrapper">
                    <form className="Search" action="/search">
                        <input placeholder="Buscar..." required/>
                        <button type="submit">
                            <SearchIcon/>
                        </button>
                    </form>
                    
                    <UserMenu/>
                </div>
            </div>

            <div id="modal" className="SearchModal">
                <div className="Container">
                    <form className="SearchMobile" action="/search">
                        <input placeholder="Buscar..." required/>
                        <button type="submit">
                            <SearchIcon/>
                        </button>
                    </form>

                </div>

                <div className="fade" onClick={hideSearch}></div>
            </div>

        </aside>
    );
};

export default Navbar;