import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { routingStore } from './stores/routingStore';

export default syncHistoryWithStore(createBrowserHistory(), routingStore);
