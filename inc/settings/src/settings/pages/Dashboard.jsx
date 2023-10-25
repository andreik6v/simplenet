import {
    Button,
    Flex,
    FlexItem,
    __experimentalGrid as Grid,
    __experimentalHStack as HStack,
    Card,
    CardHeader,
    CardBody,
    CardFooter, __experimentalNavigatorButton as NavigatorButton,
} from "@wordpress/components";
import {Icon, arrowRight} from '@wordpress/icons';
import onboardingWizard from '../assets/images/onboarding-wizard.webp';
import onboardingVideo from '../assets/images/onboarding-video.webp';
import onboardingSupport from '../assets/images/onboarding-support.webp';
import {useContext} from "@wordpress/element";
import {SettingsContext} from "../context/SettingsContext";
import {Video} from "../components/partials/Video";
import builderImage from '../assets/images/builder-illustration.webp';
import {Header} from "../components/partials/Header";

const {__} = wp.i18n;

function Dashboard() {

    const {activeItem, setActiveItem} = useContext(SettingsContext);

    return (
        <div className={"henry-inner-settings"}>
            <div className={"henry-dash-hero"}>
                <div className="henry-dash-container">
					<Header />
                    <Flex gap={"75px"} className="henry-dash-hero-content">
                        <FlexItem>
                            <h1>{__('Welcome to henry, the future of WordPress site building.', 'henry')}</h1>
                            <p>{__('A new era of site building has arrived in WordPress. With the powerful new site editor, you can build beautiful, blazing-fast websites natively right inside WordPress — no page builder plugins required.', 'henry')}</p>
                            <p>{__('henry is a block theme designed and built to work seamlessly with the new site editor. henry is also a handy educational resource, helping you learn the new WordPress interface and workflows so you can launch quicker. Ready to get started?', 'henry')}</p>
                            <NavigatorButton variant="primary" onClick={() => setActiveItem('/onboarding')}
                                             className={activeItem === '/onboarding' ? 'henry-nav-is-active' : ''}
                                             path="/onboarding">
                                <HStack spacing="3">
                                    <span>{__('Go to the Setup Wizard', 'henry')}</span> <Icon icon={arrowRight}/>
                                </HStack>
                            </NavigatorButton>
                        </FlexItem>
                        <FlexItem>
							<img className="henry-builder-illustration" src={builderImage}/>
                        </FlexItem>
                    </Flex>
                </div>
            </div>
            <div className="henry-dash-content">
                <div className="henry-dash-container">
					<Flex className="henry-dash-content-intro">
						<h2>{__('Get Started with henry', 'henry')}</h2>
					</Flex>
                    <Grid className={"henry-dash-boxes"} columns={3} gap={8}>
                        <Card>
                            <CardHeader size="large">
                                <h3>{__('henry Setup Wizard', 'henry')}</h3>
                            </CardHeader>
                            <CardBody size="large">
                                <img src={onboardingWizard}/>
                                <p>{__('The henry Setup Wizard makes setting up your site a breeze. Choose your styles, create some pages, and you’re ready to go!', 'henry')}</p>
                            </CardBody>
                            <CardFooter size="large">
                                <NavigatorButton variant="secondary" onClick={() => setActiveItem('/onboarding')}
                                                 className={activeItem === '/onboarding' ? 'henry-nav-is-active' : ''}
                                                 path="/onboarding">
                                    {__('Start Site Setup', 'henry')}
                                </NavigatorButton>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader size="large">
                                <h3>{__('Learn with Docs and Videos', 'henry')}</h3>
                            </CardHeader>
                            <CardBody size="large">
                                <img src={onboardingVideo}/>
                                <p>{__('Learn how to design in the WordPress editor, how to work with patterns, how to use all of the powerful henry features, and more.', 'henry')}</p>
                            </CardBody>
                            <CardFooter size="large">
                                <NavigatorButton variant="secondary" onClick={() => setActiveItem('/documentation')}
                                                 className={activeItem === '/documentation' ? 'henry-nav-is-active' : ''}
                                                 path="/documentation">
                                    {__('Browse the henry Docs', 'henry')}
                                </NavigatorButton>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader size="large">
                                <h3>{__('Get Help', 'henry')}</h3>
                            </CardHeader>
                            <CardBody size="large">
                                <img src={onboardingSupport}/>
                                <p>{__('Having trouble with your theme or want to report an issue? Submit an issue through the henry GitHub repo and we\'ll help out.', 'henry')}</p>
                            </CardBody>
                            <CardFooter size="large">
                                <Button href="https://github.com/henryWP/henry/issues/new/choose" variant="secondary">
                                    {__('Visit henry on Github', 'henry')}
                                </Button>
                            </CardFooter>
                        </Card>
                    </Grid>
                </div>
            </div>

            <div className="henry-dash-content henry-dash-content-alt">
                <div className="henry-dash-container">
					<Flex className="henry-dash-content-intro" >
						<h2>{__('henry Video Tutorials', 'henry')}</h2>
						<NavigatorButton variant="secondary" onClick={() => setActiveItem('/videos')}
											path="/videos">
							{__('View Full Video Library', 'henry')}
						</NavigatorButton>
					</Flex>
                    <Grid className={"henry-dash-boxes"} columns={3} gap={8}>
						<Video 
							title={__('What is a block theme?', 'henry')}
							tagline={__('Let\'s dig into block themes and learn about all of the powerful new features.', 'henry')}
							videoId={'D7GUoX2XU1k'}
						/>
						<Video 
							title={__('Intro to henry', 'henry')}
							tagline={__('Learn about the henry dashboard and the henry setup wizard.', 'henry')}
							videoId={'JZ1EgDaDAH0'}
						/>
						<Video 
							title={__('henry Setup Wizard', 'henry')}
							tagline={__('Set up your site with a few clicks with the henry Setup Wizard.', 'henry')}
							videoId={'OiO4gNDY0VQ'}
						/>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
