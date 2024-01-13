import { useEffect, useState, useRef } from 'react'
import { Layout, Col, Row } from "antd";
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { PlayCircleFilled, StepBackwardFilled, StepForwardFilled, PauseCircleFilled } from "@ant-design/icons";
import { formatDuration } from "../../utils/util";

const { Footer } = Layout;

const title = {
    fontWeight: "600",
    fontSize: "16px",
    width: "max-content",
    lineHeight: "18px",
    cursor: "pointer", 
    color: "white"
}

const subtitle = {
    fontWeight: "normal",
    fontSize: "13px",
    width: "max-content",
    lineHeight: "16px",
    color: "white"
}

const MusicPlayer = ( { name, artist, duration, song } ) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [curDuration, setCurDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar = useRef();

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setCurDuration(seconds);
    progressBar.current.max = seconds;
  };

  useEffect(() => {
    volumeBar.current.style.setProperty('--seek-before-width', "50%");
  }, [])

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue){
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
    }
    else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / curDuration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const volumeChange = () => {
    audioPlayer.current.volume = volumeBar.current.value;
    volumeBar.current.style.setProperty('--seek-before-width', `${volumeBar.current.value * 100}%`)
  }

  return (
    <Footer className='musicPlayer'>
        <audio src={song} ref={audioPlayer} preload="metadata" onLoadedMetadata={onLoadedMetadata}/>
        <Row style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Col span={7}>
                <Row style={{gap: "10px"}}>
                    <div
                        style={{
                            backgroundColor: "#fde3cf",
                            width: "64px",
                            height: "64px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Col>
                            <MusicNoteIcon className='themeColor2'/>
                        </Col>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                        <div style={title} className="underlinedWhenHovered">{name}</div>
                        <div style={subtitle}>{artist}</div>
                    </div> 
                </Row>
            </Col>
            <Col span={10} style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Row style={{justifyContent: "center", gap: "30px"}}>
                    <StepBackwardFilled className='musicPlayerIcon'/>
                    {isPlaying ? <PauseCircleFilled className='musicPlayerIcon' onClick={togglePlayPause}/> : <PlayCircleFilled className='musicPlayerIcon' onClick={togglePlayPause}/>}
                    <StepForwardFilled className='musicPlayerIcon'/>
                </Row>
                <Row style={{alignItems: "center", justifyContent: "space-between", height: "25px"}}>
                    <Col className="progress-time-current milli" span={2}>
                        {formatDuration(currentTime)}
                    </Col>
                    <Col span={19} style={{height: "25px"}}>
                        <input type='range' defaultValue="0" ref={progressBar} onChange={changeRange}/>
                    </Col>
                    <Col className="progress-time-total milli" span={2}>
                        {(curDuration && !isNaN(curDuration)) && formatDuration(curDuration)}
                    </Col>
                </Row>
            </Col>
            <Col span={3}/>
            <Col span={4}>
                <Row style={{alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
                    <Col style={{color: "#fde3cf"}}><VolumeUpIcon /></Col>
                    <Col span={20} style={{height: "21px", boxSizing: "content-box", display: "flex", alignItems: "center"}}>
                        <input type='range' min="0" max="1" step="0.1" defaultValue="0.5" ref={volumeBar} onChange={volumeChange}/>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Footer>
  )
}

export default MusicPlayer