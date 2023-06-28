import Card from "../Card";
import Skeleton from "../Skeleton/Skeleton";

const ListGrid = ({ data }) => {  
    const arr = [1,2,3,4,5,6];

    return (
        <div className="WrapperGrid">
            {data !== undefined ? data.map((dataList, idx) => <Card key={idx} 
            channelURL={dataList.channelURL} channelphoto={dataList.channelphoto} title={dataList.title} 
            channel={dataList.channel} photo={dataList.photo}
            date={dataList.date} views={dataList.views}/>) :

            arr.map((_,idx) => <Skeleton key={idx}/>)
            }
        </div>
    );
}
  
export default ListGrid;
