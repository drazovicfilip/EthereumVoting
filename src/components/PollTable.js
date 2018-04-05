import React from 'react';
import { inject, observer } from 'mobx-react';

import * as moment from 'moment';

import { Table, TableHead, TableRow, TableBody, TableCell } from 'material-ui';

const PollTable = inject('domainStore', 'uiStore')(observer((props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Poll Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell numeric>Votes</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Expires</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.domainStore.polls.map((n, i) => {
          return (
            <TableRow key={n.id}
              hover={true}
              onClick={() => {
                props.uiStore.toggleResultDrawer(i);
              }}
            >
              <TableCell>{n.id}</TableCell>
              <TableCell>{n.name}</TableCell>
              <TableCell>{n.description}</TableCell>
              <TableCell numeric>{props.domainStore.pollsVotes[i]}</TableCell>
              <TableCell>{moment.utc(n.created).toString()}</TableCell>
              <TableCell>{moment.utc(n.expires).toString()}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}))

export default PollTable;