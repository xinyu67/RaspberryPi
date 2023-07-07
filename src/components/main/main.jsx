import React, { useState, useEffect } from 'react';
import './main.css';
import temperature from '../../assets/temperature.png'
import humidity from '../../assets/humidity.png'
// axios套件接api用的
import axios from 'axios';
function Main() {

    // const [location, setLocation] = ('')
    const [data, setData] = useState('')
    const url = `https://raspberrypia.zeabur.app/realtimeData`;


    // 使用get方法取得資料
    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data.HTValue[0].temp);
                console.log(response.data.HTValue[0].humid);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });




    return (
        <section className='mainContent'>
            <div className="wrapper">


                <div className="cardBox">

                    {/* 溫度卡片 */}
                    <div className="statusCard">
                        <div className="textWrapper">
                            <div className="subTitle">
                                <p>
                                    溫度
                                </p>
                            </div>

                            <div className="Text">
                                <p>
                                    {data && data.HTValue && data.HTValue[0].temp
                                        ? data.HTValue[0].temp.toString()
                                        : null}°C
                                </p>
                            </div>

                        </div>

                        <div className="imgSection">
                            <img src={temperature} alt="" />
                        </div>
                    </div>

                    {/* 濕度卡片 */}
                    <div className="statusCard">
                        <div className="textWrapper">
                            <div className="subTitle">
                                <p>
                                    濕度
                                </p>
                            </div>
                            <div className="Text">{data && data.HTValue && data.HTValue[0].humid
                                        ? data.HTValue[0].humid.toString()
                                        : null}%</div>
                        </div>

                        <div className="imgSection">
                            <img src={humidity} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;