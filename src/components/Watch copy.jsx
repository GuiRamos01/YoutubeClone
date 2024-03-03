import React, {useEffect, useState} from 'react';
import "../styles/main.sass"
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import "../styles/pages/Watch.sass";
import "../styles/components/Player.sass"
import "../styles/components/Comments.sass";
import UINumber from "../components/UNumber";
import TextOverflow from 'react-text-overflow';
import {Link, useLocation} from "react-router-dom";
import imgUser from "../image/photo-vertical.png";

import "videojs-http-source-selector";

import VerifiedIcon from '@mui/icons-material/Verified';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import LockIcon from '@mui/icons-material/Lock';
import PlayDisabledRoundedIcon from '@mui/icons-material/PlayDisabledRounded';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ModalReport from "../components/ModalReport";
import Comment from "../components/Comment";
import Footer from "../components/Footer";

import List from "../components/List/List";
import dataList from "../data/videos";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";

import axios from "axios";

import ReactReadMoreReadLess from "react-read-more-read-less";
import { withTranslation } from "react-i18next";
import VideoJS from '../components/VideoJS';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming';
import moment from 'moment';
import SkeletonComment from '../components/Skeleton/SkeletonComment';
import { Oval } from  'react-loader-spinner';
import Iframe from 'react-iframe'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  flex: 7;
  padding-top: 70px;
  min-height: 100vh;
`;

const Watch = ({t, i18n}) => {
  const showComments = event => {
    const Comments = document.getElementById("Comments");
    document.body.classList.add('stop-scrolling');
    Comments.classList.add('show');
  };  

  const hideComments = event => {
    const Comments = document.getElementById("Comments");
    document.body.classList.remove('stop-scrolling');
    Comments.classList.remove('show');
  };  

  const showShare = event => {
    const Share = document.querySelector(".Share");
    Share.classList.add('show');
  };  

  const hideShare = event => {
    const Share = document.querySelector(".Share");
    Share.classList.remove('show');
  };  

  const showModalReport = event => {
    const Modal1 = document.querySelector(".modalReport");
    Modal1.classList.add('show');
  };  

  const hideModalReport = event => {
    const Modal1 = document.querySelector(".modalReport");
    Modal1.classList.remove('show');
  };  

  const [data, setData] = useState(undefined);
  
  useEffect(() => {

    setTimeout(() => {
      setData(dataList)
    }, 2000);

  }, []);

  const [toggleState, setToggleState] = useState(1);
  const ToggleTab = (e) => {
    setToggleState(e);
  }

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:8800/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      console.log(error.toJSON().message);
    }
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`http://localhost:8800/api/users/unsub/${channel._id}`)
      : await axios.put(`http://localhost:8800/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const dataProduced1 = currentVideo?.createdAt;
  const dataProduced = moment(dataProduced1).format('DD.MM.YYYY');

  const dataVideo1 = currentVideo?.createdAt;
  const dataVideo = moment(dataVideo1).format('DD.MM.YYYY');

  const [loading, setLoading] = useState(true);
  const itensSkeleton = [1,2,3,4,5,6]

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500)
  })
  
  const [loadingDesc, setLoadingDesc] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingDesc(false);
    }, 4800)
  })

  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingOptions(false);
    }, 7800)
  })
  
  return (
      <aside id="Watch">
        <Container>
          <Navbar />
          <Main>
            <Menu />
              {loading ? (
                <div className="loadingPage">
                  <Oval
                    height={50}
                    width={50}
                    color="#FF7A00"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#ffd993"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                </div>
              ):(
                <div className="WrapperWatch">
                  <div className="Content">
                    {/* Player de vídeo */}
                      <VideoJS/>

                    {loadingOptions ? (
                      <div className="skeleton">
                        <h1 className="Title loading"> </h1>
                      </div>          
                    ):(                    
                      <div className="watch-options">
                        <div className="buttonOption" onClick={handleLike}>
                          <div className="like colorOrange">
                            <ThumbUpAltIcon />
                          </div>

                          <div className="like colorWhite">
                            <ThumbUpAltIcon />
                          </div>

                          1
                        </div>

                        <div onClick={showShare} className="buttonOption colorWhite" data-tooltip={t('Compartilhar')}>
                          <ShareIcon/>
                        </div>

                        <div className="buttonOption colorWhite" data-tooltip={t('Salvar')}>
                          <BookmarkIcon/>
                        </div>

                        <div className="buttonOption colorWhite" onClick={showModalReport} data-tooltip={t('Denunciar')}>
                          <FlagIcon/>
                        </div>

                        {/* Editar clipe */}
                        <div className="buttonOption exclusive" data-tooltip={t('Editar')}>
                          <Link to={`/studio/editclip/${path}`}>
                            <EditIcon/>
                          </Link>
                        </div>

                        {/* Editar vídeo */}
                        <div className="buttonOption exclusive" data-tooltip={t('Editar')}>
                          <Link to={`/studio/editvideo/${path}`}>
                            <EditIcon/>
                          </Link>
                        </div>

                        <div className="buttonOption exclusive" data-tooltip={t('Criar clipe')}>
                          <Link to={`/studio/clips/${path}`}>
                            <ContentCutIcon/>
                          </Link>
                        </div>
                      </div>
                    )}

                    <div id="modal" className="Share">
                      <div className="Container">
                        <div className="Title colorGrey">
                          <span>
                            {t('Compartilhar')}
                          </span>

                          <div className="exit" onClick={hideShare}>
                            <CloseIcon/>
                          </div>
                        </div>

                        <div className="Itens">
                          <div className="button">
                            <svg fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z"></path><path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z"></path></g></svg>
                            Whatsapp
                          </div>

                          <div className="button">
                            <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>facebook</title> <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"></path> </g></svg>
                            Facebook
                          </div>

                          <div className="button">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.83 8.00001C19.83 8.17001 19.83 8.35001 19.83 8.52001C19.8393 10.0302 19.5487 11.5272 18.9751 12.9242C18.4014 14.3212 17.5562 15.5904 16.4883 16.6583C15.4204 17.7262 14.1512 18.5714 12.7542 19.1451C11.3572 19.7187 9.86017 20.0093 8.34999 20C6.15213 20.0064 3.9992 19.3779 2.14999 18.19C2.47999 18.19 2.78999 18.19 3.14999 18.19C4.96345 18.19 6.72433 17.5808 8.14999 16.46C7.30493 16.4524 6.48397 16.1774 5.80489 15.6744C5.12581 15.1714 4.62349 14.4662 4.36999 13.66C4.62464 13.7006 4.88213 13.7207 5.13999 13.72C5.49714 13.7174 5.85281 13.6738 6.19999 13.59C5.2965 13.4056 4.48448 12.9147 3.90135 12.2003C3.31822 11.486 2.99981 10.5921 2.99999 9.67001C3.55908 9.97841 4.18206 10.153 4.81999 10.18C4.25711 9.80767 3.79593 9.30089 3.47815 8.7055C3.16038 8.11011 2.99604 7.44489 2.99999 6.77001C3.00124 6.06749 3.18749 5.37769 3.53999 4.77001C4.55172 6.01766 5.81423 7.03889 7.24575 7.76757C8.67727 8.49625 10.2459 8.91613 11.85 9.00001C11.7865 8.69737 11.753 8.38922 11.75 8.08001C11.7239 7.25689 11.9526 6.44578 12.4047 5.75746C12.8569 5.06913 13.5104 4.53714 14.2762 4.23411C15.0419 3.93109 15.8826 3.87181 16.6833 4.06437C17.484 4.25693 18.2057 4.69195 18.75 5.31001C19.655 5.12822 20.5214 4.78981 21.31 4.31001C21.0088 5.24317 20.3754 6.0332 19.53 6.53001C20.3337 6.44316 21.1194 6.23408 21.86 5.91001C21.3116 6.71097 20.6361 7.41694 19.86 8.00001H19.83Z" fill="#000000"></path> </g></svg>                          
                            Twitter
                          </div>

                        </div>
                      </div>

                      <div className="fade" onClick={hideShare}></div>
                    </div>

                    <div id="modal" className="modalReport">
                      <div className="Container">
                          <div className="Title colorGrey">
                              <span></span>

                              <div className="exit" onClick={hideModalReport}>
                                  <CloseIcon/>
                              </div>
                          </div>

                          <div className="Container2">
                            <form action="">
                              <ModalReport/>

                              <button type="submit" className="bgOrange">{t('Enviar')}</button>
                            </form>
                          </div>
                      </div>

                      <div className="fade" onClick={hideModalReport}></div>
                    </div>

                    {loadingDesc ? (
                      <div className="skeleton">
                        <h1 className="Title loading"> </h1>

                        <div className="Info colorGrey">
                          <h1 className="loading"> </h1>
                        </div>
                      </div>
                    ):(
                      <div>
                        <span className="videoClip colorBlack bgOrangeLow">
                          <b>{t('Episódio')}:</b>
                          <Link to="/watch/video">
                            <TextOverflow text="Titulo de video original" />
                          </Link>
                        </span>

                        <div className="Title colorWhite">Lorem Ipsum</div>

                        <div className="InfoGroup">
                          <div className="Info colorWhite">
                            <b><UINumber format="0,0">1250</UINumber></b> 
                            <TextOverflow text={t('visualizações')} />
                          </div>
                        </div>

                        <div className="InfoGroup">
                          <span className="Live colorWhite bgRed">{t('AO VIVO')}</span>

                          <div className="Info colorWhite">
                            <b><UINumber format="0,0">125</UINumber></b> 
                            <TextOverflow text={t('assistindo')} />
                          </div>
                        </div>
                      </div>
                    )}

                    {loadingDesc ? (                    
                      <div className="Channel skeleton">
                        <div className="details detailsChannel">
                          <img className="ChannelImage loading" src="" alt="" />

                          <div className="text-details">
                            <h1 className="loading"> </h1>

                            <h1 className="loading"> </h1>  
                          </div>
                        </div>
                      </div>
                    ):(
                      <div className="Channel">
                        <div className="details">
                          <Link to="/c/test">
                            <img className="photo" src={imgUser} alt="" /> 

                            <div className="text-details">
                              <h1 className="titleChannel colorWhite" title="Test 1">
                                <TextOverflow text="Test 1" />

                                  <div title={t('Verificado')} style={{display:"flex"}}>
                                      <VerifiedIcon/>
                                  </div>
                              </h1>

                              <h2 className='colorWhite'><UINumber format="0a">2</UINumber> {t('seguidores')}</h2>
                            </div>
                          </Link>
                        </div>
                      

                        <div onClick={handleSub} className="follow colorOrange borderOrange button">
                          {t('Seguindo')}
                        </div>

                        <div onClick={handleSub} className="follow bgOrange colorWhite button">
                          + {t('Seguir')}
                        </div>
                      </div>
                    )}

                    <div className="description-video">
                        <div className="tabsDescription">
                          <button onClick={()=>ToggleTab(1)} className={toggleState === 1 ? "tabs active-tabs" : "tabs"}>
                            {t('Descrição')}
                          </button>

                          <button onClick={()=>ToggleTab(2)} className={toggleState === 2 ? "tabs active-tabs" : "tabs"}>
                            {t('Sobre o canal')}
                          </button>
                        </div>

                        <div className={toggleState === 1 ? "content active-tabs" : "content"}>
                          <div className="date">
                            <div className="dateProduced">
                              {t('Produzido em')} {dataProduced} 
                              <span>•</span>
                            </div>

                            <div className="datePublish">
                              {t('Publicado em')} {dataVideo}
                            </div>
                          </div> 

                          {loadingDesc ? (
                            <div className="skeleton">
                              <div className="Channel loading bgGreyLow2"></div>
                            </div>
                          ):(
                            <p>
                              <ReactReadMoreReadLess
                                charLimit={220}
                                readMoreText={t('Ler mais')}
                                readLessText={t('Ler menos')}
                                >
                                Ad nisi elit veniam laboris quis velit aliqua duis esse voluptate aliqua tempor fugiat. Laboris occaecat veniam sit in amet do enim sint.
                              </ReactReadMoreReadLess>
                            </p>
                          )}
                        </div>

                        <div className={toggleState === 2 ? "content active-tabs" : "content"}>
                          <p>
                            Ex excepteur enim exercitation eu. Exercitation exercitation amet ad commodo eiusmod nostrud fugiat fugiat duis. Adipisicing adipisicing ex fugiat aliquip velit dolore elit amet eu occaecat anim sit cupidatat id. Elit aliqua nulla ex ipsum fugiat consectetur qui. Excepteur velit aliqua ex officia excepteur proident aliquip magna laborum eiusmod dolor non. Enim aute et tempor laborum velit sint irure eu elit occaecat.
                          </p>
                        </div>
                
                    </div>

                    <div className="buttonComments borderOrange" onClick={showComments}>
                      <span>{t('Ver comentários')}</span>

                      <KeyboardDoubleArrowUpIcon/>
                    </div>

                    <aside id="Comments" className="">
                        <div className="Container">
                            <div className="Title colorWhite">
                                <span>
                                    {t('Comentários')}
                                </span>

                                <div className="exitComments" onClick={hideComments}>
                                <CloseIcon/>
                                </div>
                            </div>

                            <div className="NewComment">
                                <div className="Avatar">
                                    <img src={imgUser} alt="" /> 
                                </div>

                                <form action="">
                                    <input placeholder={t('Adicione um comentário...')} required />
                                    <button type='submit'><SendIcon/></button>
                                </form>
                            </div>

                            <div className="CommentLogout">
                              <span><Link to="/login">{t('Faça login')}</Link> {t('e realize seu comentario')}.</span>
                            </div>

                            <aside id="Comment">
                              {loading ? (
                                itensSkeleton.map((video) =><SkeletonComment/>)   
                                ):(
                                <Comment/>               
                              )}
                            </aside>  
                        </div>

                        <div className="fade" onClick={hideComments}></div>
                    </aside>


                  </div>
                  
                  <div className="Recommentation">
                    <Iframe url={`/chatlive/id`}
                      id=""
                      className=""
                      display="block"
                      position="relative"/>

                    <List className="p-none" data={data}/>
                  </div>

                  <div className='WarningItems'>
                    <div className="Warning">
                      <div className="IconHeader">
                        <LockIcon/>
                      </div>

                      <div className="details">
                        <span>
                          {t('VideoPrivadoMsg')}
                        </span>
                      </div>
                    </div>

                    <div className="Warning">
                      <div className="IconHeader">
                        <PlayDisabledRoundedIcon/>
                      </div>

                      <div className="details">
                        <span>
                          {t('VideoRemovidoMsg')}
                        </span>
                      </div>
                    </div>

                    <div className="Warning">
                      <div className="IconHeader">
                        <AccessTimeIcon/>
                      </div>

                      <div className="details">
                        <span>
                          {t('Vídeo em processamento. Aguarde.')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </Main>
          <Footer/>
        </Container>
      </aside>
    );
  }
export default withTranslation()(Watch);