import createHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { routingStore } from './stores/routingStore';

export default syncHistoryWithStore(createHistory(), routingStore);
