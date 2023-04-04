import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Compoents/About";
import Draw from "./Compoents/Draw";

import Home from "./Compoents/Home";
import { Canvas } from "./Compoents/Konva";
import Main from "./Compoents/Main";
import SideBar from "./Compoents/Sidebar";
import SidePro from "./Compoents/SideProject";

function App() {
  const outerDivRef = useRef("");
  const Url = useSelector((state) => state.counter.url);
  // const [Url, setUrl] = useState(null);
  // const [dragable, setDragable] = useState(true);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideBar />}>
            <Route
              index
              element={
                <Main>
                  <Home />
                </Main>
              }
            />
            <Route
              path="Annotaion"
              element={<Draw outerDivRef={outerDivRef} Url={Url} />}
              //element={<Canvas />}
            />
            <Route
              path="About"
              element={
                <Main>
                  <About />
                </Main>
              }
            />
            <Route
              path="SidePro"
              element={
                <Main>
                  <SidePro />
                </Main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Draw outerDivRef={outerDivRef} Url={Url} /> */}
    </>
  );
}

export default App;
