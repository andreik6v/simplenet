import ThemeSetup from "../pages/ThemeSetup";
import Documentation from "../pages/Documentation";
import Dashboard from "../pages/Dashboard";
import Videos from "../pages/Videos";
import {useState, useEffect, useContext} from "@wordpress/element";
import {Flex, FlexItem} from '@wordpress/components';

import {
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalNavigatorProvider as NavigatorProvider,
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalNavigatorScreen as NavigatorScreen,
    // eslint-disable-next-line @wordpress/no-unsafe-wp-apis
    __experimentalNavigatorButton as NavigatorButton,
    Dashicon,
} from '@wordpress/components';
import {Icon, chevronLeft, home, video, formatListNumbered, help, pages} from '@wordpress/icons';
import {SettingsContext} from "../context/SettingsContext";

const {__} = wp.i18n;

function SettingsPage() {
    const {activeItem, setActiveItem} = useContext(SettingsContext);
    const [initialSet, setInitialSet] = useState(false);

    useEffect(() => {
        if (!initialSet) {
            setActiveItem('/');
            setInitialSet(true);
        }
    });

    return (
        <NavigatorProvider initialPath="/" className={"henry-settings-container"}>
            <Flex align="stretch" gap={"0"}>
                <FlexItem className={"henry-settings-left"}>
                    <Flex direction="column" align="start" justify="flex-start" gap="0"
                          className={"henry-nav-container"}>
                        <div className={"henry-back-to-dash"}>
                            <a href={options.dashboard_link}><Dashicon
                                icon="wordpress"/> {__('Back to Dashboard', 'henry')}</a>
                        </div>
                        <Flex align="start" gap="0" className="henry-menu-container">
                            <FlexItem className="henry-back-button">
                                <a href={options.dashboard_link} aria-label="Navigate to the Dashboard"><Icon
                                    icon={chevronLeft}/></a>
                            </FlexItem>
                            <FlexItem>
                                {activeItem === '/' &&
                                    <div className={"henry-panel-description"}>
                                        <h1 className={"settings-headline edit-site-sidebar-navigation-screen__title"}>{__('henry Dashboard', 'henry')}</h1>
                                        <p className="edit-site-sidebar-navigation-screen__description">
                                            {__('Here, you\'ll find everything you need to get started building with the henry theme.', 'henry')}
                                        </p>
                                    </div>
                                }
                                {activeItem === '/onboarding' &&
                                    <div className={"henry-panel-description"}>
                                        <h1 className={"settings-headline edit-site-sidebar-navigation-screen__title"}>{__('henry Theme Setup', 'henry')}</h1>
                                        <p className="edit-site-sidebar-navigation-screen__description">
                                            {__('Welcome to the henry setup wizard! We\'ll help you get your site up and running in just a few minutes.', 'henry')}
                                        </p>
                                    </div>
                                }
                                {activeItem === '/documentation' &&
                                    <div className={"henry-panel-description"}>
                                        <h1 className={"settings-headline edit-site-sidebar-navigation-screen__title"}>{__('henry Docs', 'henry')}</h1>
                                        <p className="edit-site-sidebar-navigation-screen__description">
                                            {__('Learn how to build beautiful, blazing fast websites with henry and the WordPress site editor.', 'henry')}
                                        </p>
                                    </div>
                                }
                                {activeItem === '/videos' &&
                                    <div className={"henry-panel-description"}>
                                        <h1 className={"settings-headline edit-site-sidebar-navigation-screen__title"}>{__('henry Videos', 'henry')}</h1>
                                        <p className="edit-site-sidebar-navigation-screen__description">
                                            {__('Learn how to build beautiful, blazing fast websites with henry and the WordPress site editor.', 'henry')}
                                        </p>
                                    </div>
                                }
                                <Flex direction="column" align="start" justify="flex-start" gap="0"
                                      className={"henry-nav"}>
                                    <NavigatorButton onClick={() => setActiveItem('/')}
                                                     className={activeItem === '/' ? 'henry-nav-is-active' : ''}
                                                     path="/">
                                        <Icon icon={home}/> {__('Welcome', 'henry')}
                                    </NavigatorButton>
									<NavigatorButton 
										onClick={() => setActiveItem('/onboarding')}
										className={({
											'henry-nav-is-active': activeItem === '/onboarding',
											'henry-onboarding-finished': options.onboarding_complete,
										})}
										path="/onboarding">
										<Icon icon={formatListNumbered}/> {__('Theme Setup', 'henry')}
									</NavigatorButton>
                                    <NavigatorButton onClick={() => setActiveItem('/videos')}
                                                     className={activeItem === '/videos' ? 'henry-nav-is-active' : ''}
                                                     path="/videos">
                                        <Icon icon={video}/> {__('Video Library', 'henry')}
                                    </NavigatorButton>
									<NavigatorButton onClick={() => setActiveItem('/documentation')}
                                                     className={activeItem === '/documentation' ? 'henry-nav-is-active' : ''}
                                                     path="/documentation">
                                        <Icon icon={pages}/> {__('henry Docs', 'henry')}
                                    </NavigatorButton>
                                </Flex>
                            </FlexItem>
                        </Flex>
                    </Flex>
                </FlexItem>
                {activeItem === '/' &&
                    <FlexItem isBlock={true} align="start" className={"henry-settings-right"}>
                        <NavigatorScreen path="/">
                            <Dashboard/>
                        </NavigatorScreen>
                    </FlexItem>
                }
                {activeItem === '/onboarding' &&
                    <FlexItem isBlock={true} align="start" className={"henry-settings-right"}>
                        <NavigatorScreen path="/onboarding">
                            <ThemeSetup/>
                        </NavigatorScreen>
                    </FlexItem>
                }
                {activeItem === '/documentation' &&
                    <FlexItem isBlock={true} align="start" className={"henry-settings-right"}>
                        <NavigatorScreen path="/documentation">
                            <Documentation/>
                        </NavigatorScreen>
                    </FlexItem>
                }
                {activeItem === '/videos' &&
                    <FlexItem isBlock={true} align="start" className={"henry-settings-right"}>
                        <NavigatorScreen path="/videos">
                            <Videos/>
                        </NavigatorScreen>
                    </FlexItem>
                }
            </Flex>
        </NavigatorProvider>
    )
}

export default SettingsPage;
