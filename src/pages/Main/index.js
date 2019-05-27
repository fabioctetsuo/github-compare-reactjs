import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    loadingUpdate: false,
    loading: false,
    error: false,
    repoName: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('repositories')) || [];

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
      const localRepositories = await this.getLocalRepositories();
      await localStorage.setItem(
        'repositories',
        JSON.stringify([...localRepositories, data]),
      );
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleUpdate = async (id) => {
    const { repositories } = this.state;
    this.setState({ loadingUpdate: true });
    try {
      const { data } = await api.get(`/repositories/${id}`);
      data.last_commit = moment(data.pushed_at).fromNow();
      this.setState({
        repoName: '',
        error: false,
        repositories: repositories.map(repo => (repo.id === id ? data : repo)),
      });

      await localStorage.setItem('repositories', JSON.stringify(repositories));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loadingUpdate: false });
    }
  }

  handleDelete = async (id) => {
    const { repositories } = this.state;
    const filteredRepos = repositories.filter(repo => repo.id !== id);
    this.setState({
      repositories: filteredRepos,
    });
    await localStorage.setItem('repositories', JSON.stringify(filteredRepos));
  }

  render() {
    const {
      repositories,
      repoName,
      error,
      loading,
      loadingUpdate,
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

        <CompareList
          repositories={repositories}
          loading={loadingUpdate}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
        />
      </Container>
    );
  }
}
