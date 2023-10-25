import {useState, useEffect, useContext} from "@wordpress/element";
import {useSelect} from "@wordpress/data";
import {
    Flex,
    FlexItem,
    RadioControl, SelectControl
} from '@wordpress/components';
import {SettingsContext} from "../../context/SettingsContext";
import HomepagePreview from "../partials/HomepagePreview"

const {__} = wp.i18n;

function Homepage() {
    const {settings, updateSetting, pageStart} = useContext(SettingsContext);
    const [homePath, setHomePath] = useState(location.protocol + '//' + location.host);
    const [blogPath, setBlogPath] = useState(location.protocol + '//' + location.host);
    const [homeDisplay, setHomeDisplay] = useState('page');
    const [homePathChanged, setHomePathChanged] = useState(false);
    const [blogPathChanged, setBlogPathChanged] = useState(false);
    const [homeId, setHomeId] = useState(0);
    const [blogId, setBlogId] = useState(0);
    const [fetchedPages, setFetchedPages] = useState();

    const pages = useSelect(
        (select) => {
            const {getEntityRecords} = select('core');
            return getEntityRecords('postType', 'page', {
                per_page: -1,
                order: 'asc',
                status: 'publish'
            });
        },
        []
    );

    const getSelectablePages = () => {
        if (!fetchedPages) {
            return [];
        }

        const options = [];

        fetchedPages.map(function (page) {
            if (page.title.raw && page.title.raw !== '') {
                options.push({
                    label: page.title.raw,
                    value: page.id,
                });

            }
            return page;
        });

        return options;
    };

    useEffect(() => {
        // Set focus.
        pageStart.current.focus();

        if (settings.home_id && pages) {
            setHomeId(settings.home_id);
        }

        if (settings.blog_id && pages) {
            setBlogId(settings.blog_id);
        }

        if (settings.homepage_display) {
            setHomeDisplay(settings.homepage_display);
        }

        setFetchedPages(pages);
    }, [settings, pages]);

    return (
        <section>
            <div className="henry-setting-fields">
                <Flex className="henry-setting-intro">
                    <FlexItem>
                        <h2 ref={pageStart}>{__('Homepage and Blog', 'henry')}</h2>
                        <p>{__('Select which pages you\'d like to assign as your homepage and blog page. You can use the pages we just created in the last step.', 'henry')}</p>
                    </FlexItem>
                </Flex>
                <Flex className="henry-setting-field">
                    <FlexItem>
                        <label for="homepage-display">{__('Your homepage displays', 'henry')}</label>
                        <p>{__('Choose what kind of homepage you\'d like to start with. We\'ll help you edit it after setup.', 'henry')}</p>
                    </FlexItem>
                    <FlexItem>
                        <RadioControl
                            id="homepage-display"
                            selected={homeDisplay}
                            options={[
                                {label: 'Your latest posts', value: 'posts'},
                                {label: 'A custom page', value: 'page'},
                            ]}
                            onChange={(value) => {
                                setHomeDisplay(value);
                                updateSetting("homepage_display", value);

                                if (value === 'page') {
                                    // We need to update blog and home path now.
                                    setHomePath(location.protocol + '//' + location.host + '/' + pages.find(page => page.id === parseInt(settings.home_id)).slug);
                                    setBlogPath(location.protocol + '//' + location.host + '/' + pages.find(page => page.id === parseInt(settings.blog_id)).slug);

                                } else {
                                    setHomePath(location.protocol + '//' + location.host);
                                    setBlogPath(location.protocol + '//' + location.host);

                                    setBlogPathChanged(false);
                                    setHomePathChanged(false);
                                }

                            }}
                        />
                        <Flex className="henry-homepage-select" gap="15px">
                            {'page' === homeDisplay &&
                                <>
                                    <div className={"page-selector"}>
                                        {pages &&
                                            <SelectControl
                                                label={__('Select homepage', 'content-protector')}
                                                value={homeId}
                                                options={getSelectablePages()}
                                                onChange={(value) => {
                                                    setHomeId(value);
                                                    updateSetting("home_id", value);

                                                    setHomePathChanged(true);
                                                    setBlogPathChanged(false);

                                                    // Update path.
                                                    setHomePath(location.protocol + '//' + location.host + '/' + pages.find(page => page.id === parseInt(value)).slug);
                                                }}
                                            />
                                        }
                                    </div>
                                    <div className={"page-selector"}>
                                        {pages &&
                                            <SelectControl
                                                label={__('Select blog page', 'content-protector')}
                                                value={blogId}
                                                options={getSelectablePages()}
                                                onChange={(value) => {
                                                    setBlogId(value);
                                                    updateSetting("blog_id", value);

                                                    setBlogPathChanged(true);
                                                    setHomePathChanged(false);

                                                    // Update path.
                                                    setBlogPath(location.protocol + '//' + location.host + '/' + pages.find(page => page.id === parseInt(value)).slug);
                                                }}
                                            />
                                        }
                                    </div>
                                </>
                            }
                        </Flex>
                    </FlexItem>
                </Flex>
            </div>
            <HomepagePreview home_path={homePath} blog_path={blogPath} home_path_changed={homePathChanged}
                             blog_path_changed={blogPathChanged} homepage_display={homeDisplay}/>
        </section>
    )
}

export default Homepage;
