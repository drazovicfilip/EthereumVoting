import React from 'react'
import {Table, TableHead, TableRow, TableCell, TableBody, Radio, Typography} from 'material-ui';
import {observer,inject} from 'mobx-react';

const TableResultDrawer = inject('uiStore','domainStore') (observer((props) => {
  const index = props.uiStore.resultDrawerIndex;
  return (
    <Table className='TableResults'>
    
    <TableHead>
        <TableRow>
            <TableCell padding={'dense'}>Results</TableCell>
            <TableCell>Outcome</TableCell>
            <TableCell>Select</TableCell>
            </TableRow>
        </TableHead>
        <TableBody 
        >
            {/* Table Row Two */}
        {props.domainStore.polls[index].results.map((r, i) => {return (
            <TableRow key={i}>
            <TableCell>
            <Typography
            component="h1"
            style={{
                fontSize: '16px',
                marginBottom:'5px',
                marginTop:'5px'
            }}
            >
            {r.name}

            {/* <Dialog
            open = {"true"}
            onClose={() => props.uiStore.toggleResultDrawer()}
            >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>

   <DialogContent>
            <DialogContentText>
           {r.address}
            </DialogContentText>
          </DialogContent>

                </Dialog> */}

            <Typography>
                {r.address}
                </Typography>
            </Typography> 
            </TableCell>
            
            
            <TableCell>
            {r.votes}
            </TableCell>


            <TableCell>
            <Radio
                checked={i === props.uiStore.resultDrawerVoteIndex}
                onClick={() => props.uiStore.setResultDrawerVoteIndex(i)}
            ></Radio>
            </TableCell>
            </TableRow>
            );})}


            
        </TableBody>




    </Table>
  );

}
))


export default TableResultDrawer;

