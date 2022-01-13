import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
// Redux使用部分
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store/store.js';

///////////////////////////////////////////////////////////////// 
// ルートコンポーネント
export default class Root extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));