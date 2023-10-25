import React,{useState} from 'react'
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

import PlayIcon from '../../assets/images/icon-play.svg';
import VideoPatternTop from '../../assets/images/video-pattern-top.svg';

const {__} = wp.i18n;

function Video(props) {

	const [isOpen, setOpen] = useState(false)

    return (
		<>
			<div className="henry-dash-video" onClick={()=> setOpen(true)}>
				<img className="henry-dash-video-pattern" src={VideoPatternTop}/>
				<div className="henry-dash-video-text">
					<h2 className="henry-dash-video-title">
						{props.title}
					</h2>
					<div className="henry-dash-video-tagline">
						{props.tagline}
					</div>
				</div>
				<div className="henry-dash-video-play">
					<img src={PlayIcon}/> <span>{__('Click to Play', 'henry')}</span>
				</div>
			</div>
			<ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={props.videoId} onClose={() => setOpen(false)} />
		</>
    )
}
export {Video};
