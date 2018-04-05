import React from 'react'
import { Drawer, Button, Typography, Grid} from 'material-ui';
import {observer,inject} from 'mobx-react';
import TableResultDrawer from './TableResultDrawer';


const ResultDrawer = inject('uiStore','domainStore') (observer((props) => {
  const index = props.uiStore.resultDrawerIndex
  return (
    <div>
      <Drawer
      open={props.uiStore.currentDrawer === "ResultDrawer"}
      onClose={() => props.uiStore.toggleResultDrawer()}
      anchor={'right'}
      > 
        <Typography
          variant="headline"
          component="h1"
          style={{
            textAlign:'center',
            marginTop:'10%',
            marginBottom:'10%',
            fontSize: '32px',
            fontWeight: 'bold'
          }}
        >
          {props.domainStore.polls[index].name}
        </Typography>
        <Typography
          style={{
          width: '530px',
          margin: 'auto',
          marginTop: '0px',
          marginBottom: '0px',
          }}
         component="p"
         >
           {props.domainStore.polls[index].description}
        </Typography>
          {/* Avatars Component of the various individuals hosting the event. */}

          <TableResultDrawer></TableResultDrawer>



          <Grid style={{ display: 'flex', justifyContent: 'space-evenly' }} justify={'center'}>
            <Button

            style={{
              bottom: '0',
              position: 'absolute',
              padding: '20px',
              fontSize: '17px',
              fontWeight: 'bold'
            }}
            fullWidth={true}
             variant="raised"
             color="primary"
             className="AcceptButton" onClick={() => {
               props.domainStore.voteInPoll(props.domainStore.polls[index].id, props.domainStore.polls[index].results[props.uiStore.resultDrawerVoteIndex].address);
               props.uiStore.toggleResultDrawer();
             }}>
              Vote
            </Button>
          </Grid>
      </Drawer>
    </div>
  );

}
))


export default ResultDrawer;
