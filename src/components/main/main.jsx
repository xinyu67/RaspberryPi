import React from 'react';
import './main.css';
import temperature from '../../assets/temperature.png'
import humidity from '../../assets/humidity.png'

function Main() {

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
                            <div className="Text"> 25°C</div>
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
                            <div className="Text"> 30%</div>
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