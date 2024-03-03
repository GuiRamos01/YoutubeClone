import "../styles/components/Card.sass";
import {Link} from "react-router-dom";
import VerifiedIcon from '@mui/icons-material/Verified';
import TextOverflow from 'react-text-overflow';

const Card = ({ title, photo, channel, channelURL, channelphoto }) => {    
    return (
        <aside id="Card">
            <Link to="/watch">
                <div className="Container">
                    <div className="Thumb">
                        <div className="Icons">
                            <div className="button">10:00</div>
                        </div>
                        <img className="Thumbnail" src={photo} alt="" />
                    </div>
            
                    <div className="Details">
                        <Link to={channelURL}>
                            <img className="ChannelImage" src={channelphoto} alt="" />
                        </Link>
                        
                        <div className="Texts">
                            <h1 className="colorBlack" title={title}>
                                <TextOverflow text={title} />
                            </h1>

                            <Link to={channelURL}>
                                <h2 className="titleChannel colorGreyLow" title={channel}>
                                    <TextOverflow text={channel} />

                                    <div title="Verificado" style={{display:"flex"}}>
                                        <VerifiedIcon/>
                                    </div>
                                </h2>
                            </Link>

                            <div className="info-date">
                                <h3 className="colorGreyLow">
                                    <div className="date">
                                        2 dias atrás • 
                                    </div>

                                    <div className="number-view">
                                        1k
                                        <TextOverflow text="visuzalizações" />
                                    </div>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </aside>
    );
}

export default Card;
