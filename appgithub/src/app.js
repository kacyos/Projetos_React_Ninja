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
    };
  }

  handleSearch(e) {
    const value = e.target.value;
    const keyCode = e.which || e.keyCode;
    const Enter = 13;
    if (keyCode === Enter) {
      axios.get(`https://api.github.com/users/${value}`).then((result) => {
        console.log(result);
        this.setState({
          userInfo: {
            username: result.data.name,
            image: result.data.avatar_url,
            login: result.data.login,
            repos: result.data.public_repos,
            followers: result.data.followers,
            following: result.data.following,
          },
        });
      });
    }
  }

  getRepos(type) {
    return (e) => {
      const username = this.state.userInfo.login;
      console.log(username);
      axios
        .get(`https://api.github.com/user/${username}/${type}`)
        .then((result) => {
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
        handleSearch={(e) => this.handleSearch(e)}
        getRepos={this.getRepos('repos')}
        getStarred={this.getRepos('starred')}
      />
    );
  }
}

export default App;
