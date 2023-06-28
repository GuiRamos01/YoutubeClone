import { Link } from "react-router-dom";
import User from "../image/icon-user.png";
import "../styles/components/Navbar.sass"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from "react";


const UserMenu = () => {
    const [open, setOpen] = useState(false);
    return (          
        <div className="User">
            <Link to="/login">
                <button>
                    <AccountCircleIcon />
                    Fazer login
                </button>
            </Link>

            <div className="UserMenu">
                <img onClick={()=>setOpen(!open)} src={User} alt="" />

                {open &&(
                    <div>
                        <ul className="Menu">
                            <Link to="/history">
                                <li>
                                    <HistoryIcon />
                                    Histórico
                                </li>
                            </Link>

                            <Link to="/settings">
                                <li>
                                    <SettingsIcon/>
                                    Configurações da conta
                                </li>
                            </Link>

                            <li>
                                <LogoutIcon/>
                                Sair
                            </li>
                        </ul>

                        <div onClick={()=>setOpen(!open)} className="fade-drop"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;