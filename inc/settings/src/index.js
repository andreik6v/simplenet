// eslint-disable-next-line import/no-extraneous-dependencies
import { createRoot } from '@wordpress/element';
import Settings from './settings/Settings';
import henryModal from './modal/henryModal';

if (options.screen === 'modal') {
    let modal = createRoot(document.getElementById('henry-modal'));
    modal.render(<henryModal/>);
} else if (options.screen === 'settings') {
    let settings = createRoot(document.getElementById('henry-onboarding'));
    settings.render(<Settings/>);
}
