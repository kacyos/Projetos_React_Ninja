'use strict';

import React, { PropTypes } from 'react';

import Search from './search';
import UserInfo from './userInfo';
import Actions from './actions';
import Repos from './repos';

const AppContent = ({
  userInfo,
  repos,
  starred,
  isFetching,
  handleSearch,
  getRepos,
  getStarred,
}) => {
  return (
    <div className="app">
      <h1 className="title">Pesquisa de usuários GitHub</h1>
      <Search isDisable={isFetching} handleSearch={handleSearch} />
      {isFetching && <div style={{ color: 'red' }}>CARREGANDO...</div>}
      {!!userInfo && <UserInfo userInfo={userInfo} />}
      {!!userInfo && <Actions getRepos={getRepos} getStarred={getStarred} />}

      {!!repos.length && (
        <Repos className="repos" title="Repositórios:" repos={repos} />
      )}

      {!!starred.length && (
        <Repos className="starred" title="Favoritos:" repos={starred} />
      )}
    </div>
  );
};

AppContent.propTypes = {
  userInfo: PropTypes.object,
  repos: PropTypes.array.isRequired,
  starred: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  getStarred: PropTypes.func.isRequired,
};

export default AppContent;
