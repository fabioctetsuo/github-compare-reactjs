import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    loading: false,
    error: false,
    repoName: '',
    repositories: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { repoName, repositories } = this.state;
    this.setState({ loading: true });
    try {
      const { data } = await api.get(`/repos/${repoName}`);
      data.last_commit = moment(data.pushed_at).fromNow();
      this.setState({
        repositories: [...repositories, data],
        repoName: '',
        error: false,
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories,
      repoName,
      error,
      loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />
        <Form hasError={error} onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="@username/repo"
            value={repoName}
            disabled={loading}
            onChange={e => this.setState({ repoName: e.target.value })}

          />
          <button type="submit">
            { !loading ? 'Search' : <i className="fa fa-spinner fa-spin" /> }
          </button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
