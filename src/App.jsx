import './App.css';

// axios套件接api用的
import axios from 'axios';

// 本地的component
import Head from './components/head/head';
import Main from './components/main/main';
import Chart from './components/chart/chart';


function App() {

  const url = `http://localhost:8000/realtimeData`;
  // 使用get方法取得資料
  axios.get(url).then(response => console.log(response.data));

  return (
    <div className="App">
      <Head />
      <Main />
      <Chart />
    </div>
  );
}
export default App;
