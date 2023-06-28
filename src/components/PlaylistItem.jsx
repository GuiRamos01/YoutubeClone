import "../styles/components/CardPlaylist.sass";
import {Link} from "react-router-dom";
import TextOverflow from 'react-text-overflow';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import UINumber from "./UNumber";
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt.json';

TimeAgo.addDefaultLocale(pt);

const PlaylistItem = ({ title, photo, videos }) => {
    return (
        <aside id="CardPlaylist">
            <div className="Container">
                <Link to='/playlist/test'>
                    <div className="Thumb">
                        <img className="Thumbnail" src={photo} alt="" />
                    </div>
            
                    <div className="Details">
                        <div className="playlistIcon bgGrey">
                            <PlaylistPlayIcon/>
                        </div>
                        
                        <div className="Texts">
                            <h1 className="colorBlack" title={title}>
                                <TextOverflow text={title} />
                            </h1>

                            <div className="info-date">
                                <h3 className="colorGreyLow">
                                    <div className="number-view">
                                        <div className="view">
                                            <UINumber format="0a">{videos}</UINumber>
                                        </div>
                                        <TextOverflow text="vídeos" />
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default PlaylistItem;