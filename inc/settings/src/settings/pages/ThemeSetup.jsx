import {Button, __experimentalSpacer as Spacer, FlexItem, Flex} from "@wordpress/components";
import {Wizard, Steps, Step, Navigation} from "react-wizr";
import Welcome from "../components/steps/Welcome";
import SiteSetup from "../components/steps/SiteSetup";
import BrandSetup from "../components/steps/BrandSetup";
import Homepage from "../components/steps/Homepage";
import CreatePages from "../components/steps/CreatePages";
import FinishSetup from "../components/steps/FinishSetup";
import iconCheckSaved from "../assets/images/icon-check-active.svg";
import {useContext, useEffect, useRef, useState} from "@wordpress/element";
import {SettingsContext} from "../context/SettingsContext";
import apiFetch from "@wordpress/api-fetch";

const {__} = wp.i18n;

function ThemeSetup() {
    const {
        updateSetting,
        saveSettings,
        currentStep,
        setCurrentStep,
        selectedPages
    } = useContext(SettingsContext);
    const [themeSettingsSaved, setThemeSettingsSaved] = useState(false);
    const startRef = useRef(null);

    const setSavingThemeSettings = (goToNextStep) => {
        saveSettings();
        setThemeSettingsSaved(true);
        goToNextStep();

        setTimeout(function () {
            setThemeSettingsSaved(false);
        }, 4000);
    }

    const createPages = (goToNextStep) => {
        // Create pages via Rest API.
        if (selectedPages.length > 0) {
            apiFetch({
                path: '/henry/v1/create-pages',
                method: 'POST',
                data: selectedPages,
            }).then((response) => {
                response = JSON.parse(response);

                // Update home id and blog id if page exist.
                if (response.pages.home) {
                    updateSetting("home_id", response.pages.home);
                }

                if (response.pages.blog) {
                    updateSetting("blog_id", response.pages.blog);
                }
            });
        }

        setThemeSettingsSaved(true);

        goToNextStep();

        setTimeout(function () {
            setThemeSettingsSaved(false);
        }, 4000);
    }

    function StepText({text}) {
        switch (text) {
            case 0:
                return __('Start Setup', 'henry');
            case 3:
                return __('Create Pages and Continue', 'henry');
            case 4:
                return __('Save and Finish', 'henry');
            default:
                return __('Save and Continue', 'henry');
        }
    }

    useEffect(() => {
        // Set focus.
        startRef.current.focus();
        startRef.current.scrollIntoView({behavior: 'smooth'});

    }, []);

    return (
        <Flex ref={startRef} align="stretch" gap="0" className="henry-settings-inner">
            <FlexItem className={"henry-setup-sidebar"}>
                <div>
                    <h2>{__('Theme Setup', 'henry')}</h2>
                    <p>{__('Let\'s get you up and running quicker with the setup wizard.', 'henry')}</p>
                    <Spacer margin={10}/>
                    <ul className={"henry-setup-steps"}>
                        <li className={`${currentStep === 0 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(0)}>
                            {__('Get Started', 'henry')}
                        </li>
                        <li className={`${currentStep === 1 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(1)}>
                            {__('Site Settings', 'henry')}
                        </li>
                        <li className={`${currentStep === 2 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(2)}>
                            {__('Your Brand', 'henry')}
                        </li>
                        <li className={`${currentStep === 3 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(3)}>
                            {__('Create Pages', 'henry')}
                        </li>
                        <li className={`${currentStep === 4 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(4)}>
                            {__('Homepage & Blog', 'henry')}
                        </li>
                        <li className={`${currentStep === 5 ? "is-active-step" : ""}`}
                            onClick={() => setCurrentStep(5)}>
                            {__('Finish', 'henry')}
                        </li>
                    </ul>
                </div>
            </FlexItem>
            <FlexItem className={"henry-setup-content"}>
                <Wizard
                    activeStepIndex={currentStep}
                    onStepChanged={({activeStepIndex}) => {
                        setCurrentStep(activeStepIndex);
                        // Set focus.
                        startRef.current.focus();
                        startRef.current.scrollIntoView({behavior: 'smooth'});
                    }
                    }
                >
                    <Steps>
                        <Step id="first">
                            <Welcome/>
                        </Step>
                        <Step id="second">
                            <SiteSetup/>
                        </Step>
                        <Step id="third">
                            <BrandSetup/>
                        </Step>
                        <Step id="fourth">
                            <CreatePages/>
                        </Step>
                        <Step id="fifth">
                            <Homepage/>
                        </Step>
                        <Step id="sixth">
                            <FinishSetup/>
                        </Step>
                    </Steps>
                    <Navigation
                        render={({activeStepIndex, goToNextStep, goToPrevStep, totalSteps}) => (
                            <Flex {...(activeStepIndex == 0 || activeStepIndex == 5 ? {
                                'tabIndex': '-1',
                                'className': 'henry-hide-step',
                                'aria-hidden': 'true'
                            } : {'className': 'henry-setup-nav'})}>
                                <FlexItem>
                                    {themeSettingsSaved &&
                                        <Button className="henry-setup-saved" variant="primary"
                                                onClick={goToPrevStep}><img
                                            src={iconCheckSaved}/> {__('Saved!', 'henry')}</Button>
                                    }
                                    <Flex className={`henry-wizard-progress henry-wizard-progress-${activeStepIndex}`}
                                          justify="center">
                                        <FlexItem className={`${currentStep === 1 ? "is-active-step" : ""}`}/>
                                        <FlexItem className={`${currentStep === 2 ? "is-active-step" : ""}`}/>
                                        <FlexItem className={`${currentStep === 3 ? "is-active-step" : ""}`}/>
                                        <FlexItem className={`${currentStep === 4 ? "is-active-step" : ""}`}/>
                                        <FlexItem className={`${currentStep === 5 ? "is-active-step" : ""}`}/>
                                    </Flex>
                                </FlexItem>
                                <FlexItem
                                    className={activeStepIndex < totalSteps - 1 ? "henry-setup-step" : "henry-hide-step"}>
                                    <Button className="henry-wizard-back-button" variant="link"
                                            onClick={goToPrevStep}>{__('Go Back', 'henry')}</Button>
                                    {activeStepIndex === 3 ?
                                        <Button onClick={() => createPages(goToNextStep)}
                                                className="henry-wizard-button"
                                                variant="primary">
                                            <StepText text={activeStepIndex}/>
                                        </Button>
                                        :
                                        <Button onClick={() => setSavingThemeSettings(goToNextStep)}
                                                className="henry-wizard-button"
                                                variant="primary">
                                            <StepText text={activeStepIndex}/>
                                        </Button>
                                    }
                                </FlexItem>
                            </Flex>
                        )}
                    />
                </Wizard>
            </FlexItem>
        </Flex>)
}

export default ThemeSetup;
