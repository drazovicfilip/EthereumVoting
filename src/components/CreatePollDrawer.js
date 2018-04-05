import React from 'react'
import { inject, observer } from 'mobx-react';
import { Input, FormControl, InputLabel, Button, Drawer } from 'material-ui';
import InputText from './InputText';

const CreatePollDrawer = inject('uiStore', 'domainStore')(observer((props) => {
  return (
    <Drawer
      open={props.uiStore.currentDrawer === "CreatePollDrawer"}
      onClose={() => props.uiStore.toggleCreatePollDrawer()}
    >

      <h1 style={{textAlign: 'center', marginTop: '50px', marginBottom: '0px'}}> Create Poll </h1>

      <div>
      <FormControl>
        <InputLabel
          style={{marginLeft: '30px', marginTop: '15px'}}>Poll Name
        </InputLabel>
        <Input
          onChange={(event) => props.uiStore.updateName(event.target.value)}
          value={props.uiStore.name}
          style={{width: '350px', margin: '30px', marginBottom: '10px'}} type={'text'}/>
      </FormControl>


      <FormControl>
        <InputLabel
          style={{marginLeft: '-10px', marginTop: '15px'}}>Poll Length (min)</InputLabel>
        <Input 
          onChange={(event) => props.uiStore.updateMinutes(event.target.value)}
          value={props.uiStore.minutes}
          style={{width: '130px', margin: '30px', marginBottom: '0px', marginLeft: '-10px'}} type={'text'}/>
      </FormControl>
      </div>

      <FormControl>
        <InputLabel
          style={{marginLeft: '30px', marginTop: '0px'}}>Poll Description</InputLabel>
        <Input
          onChange={(event) => props.uiStore.updateDescription(event.target.value)}
          value={props.uiStore.description}
          style={{width: '500px', margin: '30px', marginBottom: '10px', marginTop: '15px'}} type={'text'}/>
      </FormControl>

      <div style={{margin: 'auto', marginBottom: '5px', marginTop: '5px'}}>

        <Button variant='raised' style={{margin: 'auto'}} onClick={() => props.uiStore.addPollOption()}>Add Poll Option</Button>
      </div>
      {
        props.uiStore.pollOptions.map((item, index)=>{
          return <InputText key={index} index={index}/>
        })
      }

      <Button fullWidth={true} variant='raised' color='primary' style={{borderRadius: '0px', position: 'absolute', bottom: '0', fontSize: '17px', fontWeight: 'bold', margin: 'auto', marginTop: '50px', marginBottom: '0px'}} onClick={() => {
        props.domainStore.createPoll(props.uiStore.name, props.uiStore.description, parseInt(props.uiStore.minutes, 10), props.uiStore.pollOptions)
        props.uiStore.toggleCreatePollDrawer()
      }}>Create Poll</Button>


    </Drawer>
  );
}));

export default CreatePollDrawer;
