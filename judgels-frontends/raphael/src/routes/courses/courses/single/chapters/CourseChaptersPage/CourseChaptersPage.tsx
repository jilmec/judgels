import * as React from 'react';
import { connect } from 'react-redux';

import { ContentCard } from '../../../../../../components/ContentCard/ContentCard';
import { LoadingContentCard } from '../../../../../../components/LoadingContentCard/LoadingContentCard';
import { CourseChapterCard, CourseChapterCardProps } from '../CourseChapterCard/CourseChapterCard';
import { Course } from '../../../../../../modules/api/jerahmeel/course';
import { CourseChaptersResponse } from '../../../../../../modules/api/jerahmeel/courseChapter';
import { AppState } from '../../../../../../modules/store';
import { selectCourse } from '../../../modules/courseSelectors';
import * as courseChapterActions from '../modules/courseChapterActions';

export interface CourseChaptersPageProps {
  course: Course;
  onGetChapters: (courseJid: string) => Promise<CourseChaptersResponse>;
}

interface CourseChaptersPageState {
  response?: CourseChaptersResponse;
}

export class CourseChaptersPage extends React.PureComponent<CourseChaptersPageProps, CourseChaptersPageState> {
  state: CourseChaptersPageState = {};

  async componentDidMount() {
    const response = await this.props.onGetChapters(this.props.course.jid);
    this.setState({ response });
  }

  render() {
    return (
      <ContentCard>
        <h3>Chapters</h3>
        <hr />
        {this.renderChapters()}
      </ContentCard>
    );
  }

  private renderChapters = () => {
    const { response } = this.state;
    if (!response) {
      return <LoadingContentCard />;
    }

    const { data: chapters, chaptersMap, chapterProgressesMap } = response;

    if (chapters.length === 0) {
      return (
        <p>
          <small>No chapters.</small>
        </p>
      );
    }

    return chapters.map(chapter => {
      const props: CourseChapterCardProps = {
        course: this.props.course,
        chapter,
        chapterName: chaptersMap[chapter.chapterJid].name,
        progress: chapterProgressesMap[chapter.chapterJid],
      };
      return <CourseChapterCard key={chapter.chapterJid} {...props} />;
    });
  };
}

const mapStateToProps = (state: AppState) => ({
  course: selectCourse(state),
});

const mapDispatchToProps = {
  onGetChapters: courseChapterActions.getChapters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseChaptersPage);
