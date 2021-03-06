import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router';

import { FullPageLayout } from '../../../../components/FullPageLayout/FullPageLayout';
import { ScrollToTopOnMount } from '../../../../components/ScrollToTopOnMount/ScrollToTopOnMount';
import ContentWithSidebar, {
  ContentWithSidebarItem,
  ContentWithSidebarProps,
} from '../../../../components/ContentWithSidebar/ContentWithSidebar';
import { LoadingState } from '../../../../components/LoadingState/LoadingState';
import { Course } from '../../../../modules/api/jerahmeel/course';
import { AppState } from '../../../../modules/store';
import CourseChaptersPage from './chapters/CourseChaptersPage/CourseChaptersPage';
import { selectCourse } from '../modules/courseSelectors';

import './SingleCourseRoutes.css';

interface SingleCourseRoutesProps extends RouteComponentProps<{ courseSlug: string }> {
  course?: Course;
}

const SingleCourseRoutes = (props: SingleCourseRoutesProps) => {
  const { course } = props;

  // Optimization:
  // We wait until we get the course from the backend only if the current slug is different from the persisted one.
  if (!course || course.slug !== props.match.params.courseSlug) {
    return <LoadingState large />;
  }

  const sidebarItems: ContentWithSidebarItem[] = [
    {
      id: '@',
      titleIcon: 'properties',
      title: 'Chapters',
      routeComponent: Route,
      component: CourseChaptersPage,
    },
  ];

  const contentWithSidebarProps: ContentWithSidebarProps = {
    title: 'Course Menu',
    items: sidebarItems,
    contentHeader: (
      <div className="single-course-routes__header">
        <h2 className="single-course-routes__title">{course.name}</h2>
        <div className="clearfix" />
      </div>
    ),
  };

  return (
    <FullPageLayout>
      <ScrollToTopOnMount />
      <ContentWithSidebar {...contentWithSidebarProps} />
    </FullPageLayout>
  );
};

const mapStateToProps = (state: AppState) => ({
  course: selectCourse(state),
});

export default withRouter<any, any>(connect(mapStateToProps)(SingleCourseRoutes));
