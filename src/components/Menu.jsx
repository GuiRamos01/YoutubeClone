import React from 'react';
import styled from "styled-components";

import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SearchIcon from '@mui/icons-material/Search';

import "../styles/components/Menu.sass"

const IconTitle = styled.span`
    font-size: 10px;
`;

const showSearch = event => {
    const Search = document.querySelector(".SearchModal");
    Search.classList.add('show');
    document.body.classList.add('stop-scrolling');
  };  

const Menu = () => {
    return (
        <aside id='Menu'>
            <div className='Container'>
                <div className='Wrapper'>
                    <div className='ItemMenu Home'>
                        <div className="Icon">
                            <HomeIcon />
                        </div>
                        <IconTitle>Home</IconTitle>
                    </div>

                    <div className='ItemMenu Search' onClick={showSearch}>
                        <div className="Icon">
                            <SearchIcon />
                        </div>
                        <IconTitle>Busca</IconTitle>
                    </div>

                    <div className='ItemMenu Saves'>
                        <div className="Icon">
                            <SubscriptionsIcon />
                        </div>
                        <IconTitle>Inscrições</IconTitle>
                    </div>

                    <div className='ItemMenu Activities'>
                        <div className="Icon">
                            <VideoLibraryIcon />
                        </div>
                        <IconTitle>Biblioteca</IconTitle>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Menu;