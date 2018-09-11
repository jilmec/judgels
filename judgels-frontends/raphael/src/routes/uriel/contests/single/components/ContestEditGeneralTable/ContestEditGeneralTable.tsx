import * as React from 'react';

import { formatDateTime } from 'utils/datetime';

import { FormTable, FormTableRow } from 'components/forms/FormTable/FormTable';
import { Contest } from 'modules/api/uriel/contest';

export interface ContestEditGeneralTableProps {
  contest: Contest;
}

export const ContestEditGeneralTable = (props: ContestEditGeneralTableProps) => {
  const { contest } = props;

  const rows: FormTableRow[] = [
    { key: 'jid', title: 'JID', value: contest.jid },
    { key: 'slug', title: 'Slug', value: contest.slug },
    { key: 'name', title: 'Name', value: contest.name },
    { key: 'beginTime', title: 'Begin time', value: formatDateTime(new Date(contest.beginTime), true) },
  ];

  return <FormTable rows={rows} />;
};
