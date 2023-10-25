import {
    Flex,
    FlexItem,
} from "@wordpress/components";

import henryLogo from '../../assets/images/henry-logo.svg';

const {__} = wp.i18n;

function Header(props) {

    return (
		<Flex className="henry-dash-header">
			<FlexItem>
				<Flex gap={3} align="end">
					<FlexItem>
						<img className="henry-logo" src={henryLogo}/>
					</FlexItem>
				</Flex>
			</FlexItem>
			<FlexItem>
				<ul className="henry-dash-nav">
					<li><a href="https://henrywp.com">{__('henryWP.com', 'henry')}</a></li>
					<li><a href="https://twitter.com/buildwithhenry">{__('Twitter', 'henry')}</a></li>
					<li><a href="https://www.youtube.com/@henryWP">{__('YouTube', 'henry')}</a></li>
					<li><a href="https://github.com/henryWP/henry">{__('GitHub', 'henry')}</a></li>
				</ul>
			</FlexItem>
		</Flex>
    )
}
export {Header};
