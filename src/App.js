import React from 'react';
import { observer, Provider } from 'mobx-react';

import { Button, Paper, Reboot } from 'material-ui';

import UiStore from './stores/UiStore';
import DomainStore from './stores/DomainStore';

import CreatePollDrawer from './components/CreatePollDrawer';
import ResultDrawer from './components/ResultDrawer';
import PollTable from './components/PollTable';

// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'
import './App.css'


@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.domainStore = new DomainStore();
    this.uiStore = new UiStore();
  }

  render() {
    return (
      <div>
        <Reboot />
        <Provider
          uiStore={this.uiStore}
          domainStore={this.domainStore}
        >
          <div style={{ width: '85%', margin: 'auto', textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center', fontSize: '50px' }}>Kryptocracy</h1>

            <h2> Current Polls </h2>

            <Paper>
              <PollTable />

              <CreatePollDrawer />
              {this.domainStore.polls.length > 0 ?
                <ResultDrawer />
              :
                <div/>
              }
            </Paper>

            <Button
              style={{ marginTop: '15px' }}
              variant="raised"
              size="large"
              color="primary"
              onClick={() => this.uiStore.toggleCreatePollDrawer()}
            >
              Create new poll
          </Button>

          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
