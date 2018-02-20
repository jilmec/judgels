import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import LoginForm, { LoginFormData } from '../../../jophiel/login/LoginForm/LoginForm';
import { SingleColumnLayout } from '../../../../components/layouts/SingleColumnLayout/SingleColumnLayout';
import { Card } from '../../../../components/Card/Card';
import { AppState } from '../../../../modules/store';
import { serviceLoginActions as injectedServiceLoginActions } from '../modules/serviceLoginActions';

interface ServiceLoginPageProps {
  isLoggedIn: boolean;
  onLogIn: (data: LoginFormData, redirectUri: string, returnUri: string) => Promise<void>;
  onPropagateLogin: (redirectUri: string, returnUri: string) => Promise<void>;

  match: {
    params: {
      redirectUri: string;
      returnUri: string;
    };
  };
}

class ServiceLoginPage extends React.Component<ServiceLoginPageProps> {
  async componentDidMount() {
    if (this.props.isLoggedIn) {
      await this.props.onPropagateLogin(this.props.match.params.redirectUri, this.props.match.params.returnUri);
    }
  }

  render() {
    const onSubmit = (data: LoginFormData) =>
      this.props.onLogIn(data, this.props.match.params.redirectUri, this.props.match.params.returnUri);

    return (
      <SingleColumnLayout>
        <Card title="Log in" className="card-login">
          <LoginForm onSubmit={onSubmit} />
        </Card>
      </SingleColumnLayout>
    );
  }
}

export function createServiceLoginPage(serviceLoginActions) {
  const mapStateToProps = (state: AppState) => ({
    isLoggedIn: state.session.isLoggedIn || false,
  });

  const mapDispatchToProps = {
    onLogIn: (data: LoginFormData, redirectUri: string, returnUri: string) =>
      serviceLoginActions.logIn(data.usernameOrEmail, data.password, redirectUri, returnUri),
    onPropagateLogin: serviceLoginActions.propagateLogin,
  };

  return withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(ServiceLoginPage));
}

export default createServiceLoginPage(injectedServiceLoginActions);
