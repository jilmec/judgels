import { Button, Callout, Icon, Intent, Tag } from '@blueprintjs/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { LoadingState } from '../../../../../../../../../../components/LoadingState/LoadingState';
import ContestRegistrantsDialog from '../ContestRegistrantsDialog/ContestRegistrantsDialog';
import { ContestContestantState } from '../../../../../../../../../../modules/api/uriel/contestContestant';
import { Contest } from '../../../../../../../../../../modules/api/uriel/contest';
import { AppState } from '../../../../../../../../../../modules/store';
import { selectIsLoggedIn } from '../../../../../../../../../../modules/session/sessionSelectors';
import { selectContest } from '../../../../../modules/contestSelectors';
import { contestContestantActions as injectedContestContestantActions } from '../../../modules/contestContestantActions';

import './ContestRegistrationCard.css';

export interface ContestRegistrationCardProps {
  isLoggedIn: boolean;
  contest: Contest;
  onFetchMyContestantState: (contestJid: string) => Promise<ContestContestantState>;
  onFetchContestantsCount: (contestJid: string) => Promise<number>;
  onRegister: (contestJid: string) => Promise<void>;
  onUnregister: (contestJid: string) => Promise<void>;
}

interface ContestRegistrationCardState {
  contestantState?: ContestContestantState;
  contestantsCount?: number;
  isActionButtonLoading?: boolean;
  isRegistrantsDialogOpen?: boolean;
}

class ContestRegistrationCard extends React.PureComponent<ContestRegistrationCardProps, ContestRegistrationCardState> {
  state: ContestRegistrationCardState = {};

  async componentDidMount() {
    await this.refresh();
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <Callout icon="ban-circle" className="contest-registration-card--error secondary-info">
          Please log in to register.
        </Callout>
      );
    }
    return <Callout className="contest-registration-card">{this.renderCard()}</Callout>;
  }

  private refresh = async () => {
    if (!this.props.isLoggedIn) {
      return;
    }

    const [contestantState, contestantsCount] = await Promise.all([
      this.props.onFetchMyContestantState(this.props.contest.jid),
      this.props.onFetchContestantsCount(this.props.contest.jid),
    ]);
    this.setState({ contestantState, contestantsCount });
  };

  private renderCard = () => {
    const { contestantState, contestantsCount } = this.state;
    if (!contestantState || contestantsCount === undefined) {
      return <LoadingState />;
    }

    return (
      <>
        {this.renderContestantStateTag(contestantState)}
        {this.renderActionButton(contestantState)}
        {this.renderViewRegistrantsButton(contestantsCount)}
        {this.renderRegistrantsDialog()}
        <div className="clearfix" />
      </>
    );
  };

  private renderContestantStateTag = (contestantState: ContestContestantState) => {
    if (
      contestantState === ContestContestantState.Registrant ||
      contestantState === ContestContestantState.Contestant
    ) {
      return (
        <Tag large intent={Intent.SUCCESS} className="contest-registration-card__item">
          <Icon icon="tick" /> Registered
        </Tag>
      );
    }
    return null;
  };

  private renderActionButton = (contestantState: ContestContestantState) => {
    if (contestantState === ContestContestantState.Registrable) {
      return (
        <Button
          className="contest-registration-card__item"
          intent={Intent.PRIMARY}
          text="Register"
          onClick={this.register}
          loading={this.state.isActionButtonLoading}
        />
      );
    }
    if (contestantState === ContestContestantState.Registrant) {
      return (
        <Button
          className="contest-registration-card__item"
          intent={Intent.DANGER}
          text="Unregister"
          onClick={this.unregister}
          loading={this.state.isActionButtonLoading}
        />
      );
    }
    return null;
  };

  private renderViewRegistrantsButton = (contestantsCount: number) => {
    return (
      <Button
        className="contest-registration-card__item contest-registration-card__registrants"
        icon="people"
        text={`View registrants (${contestantsCount})`}
        onClick={this.toggleRegistrantsDialog}
      />
    );
  };

  private renderRegistrantsDialog = () => {
    if (!this.state.isRegistrantsDialogOpen) {
      return null;
    }
    return <ContestRegistrantsDialog onClose={this.toggleRegistrantsDialog} />;
  };

  private register = async () => {
    this.setState({ isActionButtonLoading: true });
    await this.props.onRegister(this.props.contest.jid);
    this.setState({ isActionButtonLoading: false });
    await this.refresh();
  };

  private unregister = async () => {
    this.setState({ isActionButtonLoading: true });
    await this.props.onUnregister(this.props.contest.jid);
    this.setState({ isActionButtonLoading: false });
    await this.refresh();
  };

  private toggleRegistrantsDialog = () => {
    this.setState((prevState: ContestRegistrationCardState) => ({
      isRegistrantsDialogOpen: !prevState.isRegistrantsDialogOpen,
    }));
  };
}

function createContestRegistrationCard(contestContestantActions) {
  const mapStateToProps = (state: AppState) => ({
    isLoggedIn: selectIsLoggedIn(state),
    contest: selectContest(state)!,
  });
  const mapDispatchToProps = {
    onFetchMyContestantState: contestContestantActions.fetchMyState,
    onFetchContestantsCount: contestContestantActions.fetchCount,
    onRegister: contestContestantActions.register,
    onUnregister: contestContestantActions.unregister,
  };
  return withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(ContestRegistrationCard));
}

export default createContestRegistrationCard(injectedContestContestantActions);