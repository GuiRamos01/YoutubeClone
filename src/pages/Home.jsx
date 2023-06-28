import "../styles/main.sass"
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Footer from "../components/Footer";
import List from "../components/List/ListGrid";

import dataList from "../data/videos";
import { useEffect, useState } from "react";

import "../styles/pages/Home.sass"

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Main = styled.div`
  flex: 7;
  padding-top: 65px;
  min-height: 100vh;
`;

const Home = () => {
  const [data, setData] = useState(undefined);
  
  useEffect(() => {

    setTimeout(() => {
      setData(dataList)
    }, 2000);

  }, [])

  return (
    <aside id="Home">
      <Container>
        <Navbar />
        <Main>
          <Menu />
          <div className="Main2">
            <List data={data}/>
            <hr />

            <List data={data}/>
          </div>
        </Main>
        <Footer/>
      </Container>
    </aside>
  );
}

export default Home;
