import "../../styles/components/Skeleton.sass"

const Skeleton = () => {
    return (
        <aside id="Card">
            <div className="Container skeleton">
                <div className="Thumb">
                    <div className="Thumbnail loading"></div>
                </div>
                <div className="Details">
                    <img className="ChannelImage loading" src="" alt="" />
                    <div className="Texts">
                        <h1 className="loading"> </h1>
                        <h2 className="loading"> </h2>
                        <div className="info-date loading"></div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Skeleton;