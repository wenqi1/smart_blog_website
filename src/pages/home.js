import React from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../assets/css/home.css';
import qingtian from '../assets/media/qingtian.mp3'

const handleClick = (navigate) => {
    navigate("/main")
}

const Home = props => {
    let navigate = useNavigate()

    return <div className='home_div'>
        <div className='home_entry'>
            <Button type="link" icon={<LoginOutlined/>} block style={{height: '4rem',fontSize: '2rem'}} onClick={() => handleClick(navigate)}>
                欢迎访问
            </Button>
        </div>
        <div className='home_welcome'>
            <p>不要走在我后面, 因为我可能不会引路;</p>
            <p>不要走在我前面, 因为我可能不会跟随;</p>
            <p>请走在我的旁边, 做我的朋友。</p>
        </div>
        <div className='home_music'>
            <audio src={qingtian} autoPlay loop controls preload='auto'/>
        </div>
    </div>
}   

export default Home;
