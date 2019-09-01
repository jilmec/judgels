import * as React from 'react';
import { Route, withRouter } from 'react-router';

import ContestProblemsPage from './ContestProblemsPage/ContestProblemsPage';
import ContestProblemPage from './single/ContestProblemPage/ContestProblemPage';

const ContestProblemRoutes = () => (
  <div>
    <Route exact path="/contests/:contestSlug/problems" component={ContestProblemsPage} />
    <Route path="/contests/:contestSlug/problems/:problemAlias" component={ContestProblemPage} />
  </div>
);

export default withRouter<any, any>(ContestProblemRoutes);
