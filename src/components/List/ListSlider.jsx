import Card from "../Card";
import Skeleton from "../Skeleton/Skeleton";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ListSlider = ({ data }) => {  
    const arr = [1,2,3,4,5,6];

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              dots: true
            }
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
        ]
      };

    return (
        <Slider {...settings}>
            {data !== undefined ? data.map((dataList, idx) => <Card key={idx} 
            channelURL={dataList.channelURL} channelphoto={dataList.channelphoto} title={dataList.title} 
            channel={dataList.channel} photo={dataList.photo}
            date={dataList.date} views={dataList.views}/>) :

            arr.map((_,idx) => <Skeleton key={idx}/>)
            }
        </Slider>
    );
}
  
export default ListSlider;
