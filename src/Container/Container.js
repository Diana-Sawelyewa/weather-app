import './Container.scss';

const Container = (props) => {

    const rain = props.rain ? <div className='rain'/> : null;
    const snow = props.snow ?<div className='snow'/> : null;


    
    return (
    <div className={"cont " + setClass(props.isPink, props.isNight, props.clouds)}>
            {rain}
            {snow}
    <div className="cloud">   
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud01"/>   
    <img style={{opacity: (props.clouds<85) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud1"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud2"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '70s' : '60s'}} src="./pics/clouds/cloud3.png" alt="" className="anim cloud3"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud4.png" alt="" className="anim cloud4"/>
    <img style={{opacity: (props.clouds<85) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud5"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud6"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '70s' : '60s'}} src="./pics/clouds/cloud3.png" alt="" className="anim cloud7"/>
    <img style={{opacity: (props.clouds < 15) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud4.png" alt="" className="anim cloud8"/> 
    <img style={{opacity: (props.clouds<85) ? 0 : 0.6, animationDuration: (props.wind_speed<5) ? '90s' : '70s'}} src="./pics/clouds/cloud1.png" alt="" className="anim cloud10"/>
    <img style={{opacity: (props.isNight || props.isPink || props.clouds >= 60) ? 0 : 0.4}} src="./pics/clouds/sunshine.png" alt="" className="sunshine"/>  
    <div style={{opacity: (props.isNight && !props.isPink && !(props.clouds >= 60)) ? 0.4 : 0}} className="stars">
    <img src="./pics/clouds/stars2.png" alt="" className="stars1"/>  
    <img src="./pics/clouds/stars2.png" alt="" className="stars2"/>  
    <img src="./pics/clouds/stars3.png" alt="" className="stars3"/>  
    <img src="./pics/clouds/stars5.png" alt="" className="stars4"/>  
    <img src="./pics/clouds/stars5.png" alt="" className="stars5"/>  
    <img src="./pics/clouds/stars2.png" alt="" className="stars6"/>  
    <img src="./pics/clouds/stars2.png" alt="" className="stars7"/>  
    <img src="./pics/clouds/stars2.png" alt="" className="stars8"/>  
    </div>
    </div>
    <img style={{opacity: props.isPink ? 0.7 : 0}} src="./pics/pink.png" alt="" className="pink_pic"/>  
    </div>
    )
}


export default Container;

function setClass(isPink, isNight, clouds) {
    if (isPink) {
        return 'pink'
    } else if(isNight && clouds>=60) {
        return 'dark_grey'
    } else if (isNight && clouds<60) {
        return 'dark_blue'
    } else if (!isNight && clouds>=60) {
        return 'light_grey'
    } else {
        return 'light_blue'
    }
}



