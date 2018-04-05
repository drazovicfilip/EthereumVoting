import React from 'react';
import { Input, InputAdornment, FormControl, InputLabel, IconButton } from 'material-ui';
import { inject, observer } from 'mobx-react';
import Cancel from 'material-ui-icons/Cancel';

const InputText = inject('uiStore')(observer((props) => {
  return (<div>
    <FormControl>
    <InputLabel style={{marginLeft: '30px', marginTop: '5px'}}>
      Address
    </InputLabel>
    <Input  onChange={(event) => props.uiStore.updatePollOption(props.index, 'address', event.target.value)}
            value={props.uiStore.pollOptions[props.index].address}
            style={{width: '150px', margin: '30px', marginTop: '20px', marginBottom: '0px'}}
            type={'text'}/>
  </FormControl>
  <FormControl>
  <InputLabel style={{marginLeft: '0px', marginTop: '5px'}}>
    Name
  </InputLabel>
  <Input  onChange={(event) => props.uiStore.updatePollOption(props.index, 'name', event.target.value)}
          value={props.uiStore.pollOptions[props.index].name}
          style={{width: '325px', margin: '0px', marginTop: '20px', marginBottom: '0px', marginLeft: '0px'}}
          type={'text'}
          endAdornment={props.index >= 2 ? <InputAdornment position="end">
            <IconButton onClick={() => props.uiStore.removePollOption(props.index)}>
              <Cancel/>
            </IconButton>
          </InputAdornment> : null
        }
  />
  </FormControl>
</div>)
}));

export default InputText;

// name: string
// address: string
// onChange: func
// removePollOption
