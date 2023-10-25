import {useContext, useEffect} from "@wordpress/element";
import {Flex, Button, __experimentalHStack as HStack} from '@wordpress/components';
import {Icon, arrowRight} from '@wordpress/icons';
import builderImage from '../../assets/images/builder-illustration.webp';
import {SettingsContext} from "../../context/SettingsContext";

const {__} = wp.i18n;

function Welcome() {
    const {setCurrentStep, pageStart} = useContext(SettingsContext);

    useEffect(() => {
        // Set focus.
        pageStart.current.focus();

    }, []);

    return (
        <section className="henry-welcome-section">
            <div className="henry-setting-fields henry-welcome-screen">
                <Flex justify="center" direction="column" align="center">
                    <img className="henry-welcome-image" src={builderImage}/>
                    <div className="henry-welcome-text">
                        <h2 ref={pageStart}>{__('henry Setup Wizard', 'henry')}</h2>
                        <p>{__('The henry setup wizard will help you get your site set up quickly and ready to go live. You\'re just a few screens away from a beautiful website! Ready to go?', 'henry')}</p>
                        <Button variant="primary" onClick={() => setCurrentStep(1)}>
                            <HStack spacing="3">
                                <span>{__('Let\'s get started', 'henry')}</span> <Icon icon={arrowRight}/>
                            </HStack>
                        </Button>
                    </div>
                </Flex>
            </div>
        </section>
    )
}
export default Welcome;
