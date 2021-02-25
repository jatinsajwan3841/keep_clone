import Base from './components/todo'
import Header from "./components/header";
import React from 'react'


function App() {
  const [layout, setlayout] = React.useState(true);

  const lay = () => {
    layout ? setlayout(false) : setlayout(true);   
  }

  return (
    <>
    <Header layt = {lay} layout = {layout}/>
    <Base layout ={layout}/>
    </>
  );
}

export default App;
