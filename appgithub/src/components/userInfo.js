'use strict';

import React, { PropTypes } from 'react';

const UserInfo = ({ userInfo }) => (
  <div className="user-info">
    <div className="user-card">
    <img src={userInfo.image} />

    <h1 className="user-name">
      <a href={`https://api.github.com/user/${userInfo.login}`}>
        {userInfo.username}
      </a>
    </h1>
    </div>
<div className="card-info">
    <ul className="repos-info">
      <li>Repositórios: {userInfo.repos}</li>
      <li>Seguidores: {userInfo.followers}</li>
      <li>Seguindo: {userInfo.following}</li>
    </ul>
    </div>
  </div>
);

UserInfo.propTypes = {
  userInfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    repos: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
  }),
};

export default UserInfo;
