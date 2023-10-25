import {flushSync} from "react-dom";
import {useState, useRef, useLayoutEffect, useEffect} from "@wordpress/element";
import {Button} from "@wordpress/components";
import BrowserHeader from "../../assets/images/browser.svg";

const {__} = wp.i18n;

export default function HomepagePreview(props) {

    const iframeRef = useRef(null);
    const [iframeContainer, setIframeContainer] = useState(null);
    const [iframeStyle, setIframeStyle] = useState({});
    const deviceWidth = 1600;

    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const [displayToggle, showDisplayToggle] = useState(false);
    const [currentPath, setCurrentPath] = useState(props.home_path);
    const [iFrameDisplay, setIframeDisplay] = useState('homepage');


    // Fade in the iframe each time the src is updated.
    useEffect(() => {
        setIsIframeLoaded(false);

        if (props.homepage_display === 'page') {
            showDisplayToggle(true);
            changeIframeDisplay('homepage');
        } else {
            showDisplayToggle(false);
            changeIframeDisplay('blog');
        }

        if (props.home_path_changed) {
            changeIframeDisplay('homepage');
        }

        if (props.blog_path_changed) {
            changeIframeDisplay('blog');
        }

    }, [props.homepage_display, props.home_path, props.home_path_changed, props.blog_path_changed, , props.blog_path]);

    const handleIframeLoad = () => {
        setIsIframeLoaded(true);
    };

    const changeIframeDisplay = (page) => {
        setIframeDisplay(page);

        if (page === 'homepage') {
            setCurrentPath(props.home_path);
        } else {
            setCurrentPath(props.blog_path);
        }
    };


    useLayoutEffect(() => {
        const adjustSize = () => {
            const iframe = iframeRef.current;
            if (!iframe || !iframeContainer) {
                return;
            }

            const width = deviceWidth;
            const scaleFactor = iframeContainer.clientWidth / deviceWidth;

            setIframeStyle({
                width: width,
                height: iframeContainer.clientHeight / scaleFactor,
                transform: `scale(${scaleFactor})`,
                transformOrigin: "top left"
            });
        };

        adjustSize();

        const resizeObserver = new ResizeObserver(() => {
            // Use flushSync to prevent visual jitter from async state updates.
            flushSync(() => {
                adjustSize();
            });
        });

        if (iframeContainer) {
            resizeObserver.observe(iframeContainer);
        }

        return () => {
            resizeObserver.disconnect();
        };

    }, [iframeContainer, deviceWidth]);

    return (
        <div className="henry-homepage-iframe-outer">
            {displayToggle &&
                <div className="henry-homepage-iframe-toggle">
                    <div class="henry-homepage-iframe-buttons">
                        <Button onClick={() => changeIframeDisplay('homepage')}
                                className={iFrameDisplay === 'homepage' ? 'henry-iframe-button-active' : ''}>
                            {__('Homepage', 'henry')}
                        </Button>
                        <Button onClick={() => changeIframeDisplay('blog')}
                                className={iFrameDisplay === 'blog' ? 'henry-iframe-button-active' : ''}>
                            {__('Blog', 'henry')}
                        </Button>
                    </div>
                </div>
            }
            <div className="henry-homepage-iframe-container" ref={setIframeContainer}>
                <img src={BrowserHeader}/>
                <iframe
                    title="Iframe"
                    style={iframeStyle}
                    className={`henry-homepage-iframe ${isIframeLoaded ? 'henry-homepage-iframe-loaded' : ''}`}
                    onLoad={handleIframeLoad}
                    src={currentPath}
                    ref={iframeRef}
                />
            </div>
        </div>
    );
}
