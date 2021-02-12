'use strict';
import React, { Component } from 'react';
import axios from 'axios';

import AppContent from './components/appContent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: null,
      repos: [],
      starred: [],
      isFetching: false,
    };
  }

  getGitHubApiUrl(username, type) {
    const internalUser = username ? `${username}` : '';
    const internalType = type ? `/${type}` : '';
    return `https://api.github.com/users/${internalUser}${internalType}`;
  }

  handleSearch(e) {
    const value = e.target.value;
    const keyCode = e.which || e.keyCode;
    const Enter = 13;

    if (keyCode === Enter) {
      this.setState({ isFetching: true });

      axios
        .get(this.getGitHubApiUrl(value))
        .then((result) => {
          this.setState({
            userInfo: {
              username: result.data.name,
              image: result.data.avatar_url,
              login: result.data.login,
              repos: result.data.public_repos,
              followers: result.data.followers,
              following: result.data.following,
            },
            repos: [],
            starred: [],
          });
        })
        .finally(() => {
          this.setState({ isFetching: false });
        });
    }
  }

  getRepos(type) {
    return (e) => {
      this.setState({ starred: [], repos: [] });
      const username = this.state.userInfo.login;
      axios.get(this.getGitHubApiUrl(username, type)).then((result) => {
        this.setState({
          [type]: result.data.map((repo) => {
            return {
              name: repo.name,
              link: repo.html_url,
            };
          }),
        });
      });
    };
  }

  render() {
    return (
      <AppContent
        userInfo={this.state.userInfo}
        repos={this.state.repos}
        starred={this.state.starred}
        isFetching={this.state.isFetching}
        handleSearch={(e) => this.handleSearch(e)}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
      />
    );
  }
}

export default App;
