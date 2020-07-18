import React from 'react';
import Counter from './components/Counter';

//引入container組件CountCon
import CountCon from './container/CounterCon';


class App extends React.Component {
  public render(){
    return (
      <div className="App">
        <CountCon/>
      </div>
    );
  }
}

export default App;
