import React, {useState, useEffect} from "react";
import { Row, Col, Image, Skeleton, Button } from "antd";
import LayoutMovies from '../components/Layout'
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { helpers } from "../helpers";
import YouTube from 'react-youtube';
// import 'react-modal-video/css/modal-video.min.css';
// import ModalVideo from 'react-modal-video'
const DetailMovies = () => {
    const {slug, id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});
    const [error, setError] = useState(null);
    // const [isOpen, setOpen] = useState(false);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
  
    const onPlayerReady = (event) => {
        event.target.pauseVideo();
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await api.getDataMoviesById(id);
            if(helpers.isEmptyObject(data)){
                // ko co du lieu theo id
                setError({
                    cod: 404,
                    mess: "Not found data"
                })
            }else{
                // co du lieu theo id
                setMovie(data);
                setError(null);
            }
            setLoading(false); //hoan thanh
        }
        getData();
    }, [id]); // id ma thay doi thi useEffect se tu dong chay lai

    if(loading){
        return(
            <LayoutMovies
            level1="Trang chu"
            level2="Chi tiet"
            level3={slug}
            >
            <Row>
                <Col span={24}>
                    <Skeleton active />
                </Col>
            </Row>
            </LayoutMovies>
        )
    }

    return (
        <LayoutMovies
            level1="Trang chu"
            level2="Chi tiet"
            level3={slug}
        >
            <Row style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <Col span={24}>
                    <h4>Chi tiet bo phim</h4>
                    <Row>
                        <Col span={8}>
                           <div style={{padding: '10px'}}>
                                <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}/>
                                <p>{movie.original_title}</p>
                            </div> 
                        </Col>
                        <Col span={12}>
                            <div  style={{padding: '10px'}}>
                            <h3>{movie.title}</h3>
                            <p>{movie.overview}</p>
                            {/* <div style={{display:'flex', 
                            flexWrap:'wrap', 
                            justifyContent:'space-around'
                        }}>
                            {
                                movie['videos']['results'].map((item, index ) => ( // ////////////
                                    <span key={index} style={{padding: '10px'}}>
                                    <ModalVideo
                                        channel='youtube'
                                        autoplay
                                        isOpen={isOpen}
                                        videoId={item.key}
                                        onClose={() => setOpen(false)}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={()=> setOpen(true)}
                                    >Trailer {index + 1}</Button>
                                </span>
                                 ))
                            }
                          </div> */}
                            {
                                 movie['videos']['results'].map((item, index ) => (
                                    <div key={index} style={{marginBottom:'5px'}}>
                                    <YouTube 
                                    videoId={item.key}
                                    opts={opts}
                                    onReady={onPlayerReady}
                                       />;

                                    </div>
                                 ))
                            }
                            </div>
                        </Col>
                        <Col span={4} style={{padding:'10p'}}>
                            <h5>Image moive</h5>
                            {
                                movie['images']['backdrops'].map((item, index) => (
                                    <div key={index} style={{marginBottom:'5px'}}>
                                        <Image src={`https://image.tmdb.org/t/p/w300${item.file_path}`}/>
                                    </div>
                                ) )
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutMovies>
    )
}
export default React.memo(DetailMovies)