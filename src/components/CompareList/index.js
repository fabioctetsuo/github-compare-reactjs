import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({
  repositories, handleUpdate, handleDelete, loading,
}) => (
  <Container>
    {repositories.map(repo => (
      <Repository key={repo.id}>
        <header>
          <img src={repo.owner.avatar_url} alt="facebook" />
          <strong>{repo.name}</strong>
          <small>{repo.owner.login}</small>
        </header>
        <ul>
          <li>
            {repo.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repo.forks_count} <small>forks</small>
          </li>
          <li>
            {repo.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repo.last_commit} <small>last commit</small>
          </li>
        </ul>
        <div className="actions">
          <button
            type="submit"
            className="refresh"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate(repo.id);
            }}
          >
            {!loading ? 'Refresh' : <i className="fa fa-spinner fa-spin" />}
          </button>
          <button
            type="submit"
            className="remove"
            onClick={(e) => {
              e.preventDefault();
              handleDelete(repo.id);
            }}
          >
            Remove
          </button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }),
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      open_issues_count: PropTypes.number.isRequired,
      pushed_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CompareList;
