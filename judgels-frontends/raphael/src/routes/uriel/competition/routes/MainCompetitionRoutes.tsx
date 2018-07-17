import * as React from 'react';
import { Route } from 'react-router';

import { FullPageLayout } from '../../../../components/layouts/FullPageLayout/FullPageLayout';
import ContentWithSidebar, {
  ContentWithSidebarItem,
  ContentWithSidebarProps,
} from '../../../../components/ContentWithSidebar/ContentWithSidebar';
import ContestListPage from './contests/ContestListPage/ContestListPage';

const MainCompetitionRoutes = () => {
  const sidebarItems: ContentWithSidebarItem[] = [
    {
      id: 'contests',
      titleIcon: 'timeline-events',
      title: 'Contests',
      routeComponent: Route,
      component: ContestListPage,
    },
  ];

  const contentWithSidebarProps: ContentWithSidebarProps = {
    title: 'Competition',
    items: sidebarItems,
  };

  return (
    <FullPageLayout>
      <ContentWithSidebar {...contentWithSidebarProps} />
    </FullPageLayout>
  );
};

export default MainCompetitionRoutes;