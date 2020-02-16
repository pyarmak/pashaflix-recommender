import React from 'react';
const redirect_url = process.env.REACT_APP_REDIRECT_URL;
const client_id = process.env.REACT_APP_TRAKT_API_KEY;

export const LoginButton: React.FC<{ small?: boolean }> = ({ small }) => {
  return (
    <a
      className={`bg-gray-300 rounded-full text-white ${
        small ? 'p-2' : 'px-12 py-3'
      }`}
      style={{ lineHeight: '2em' }}
      href={`https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_url}`}
    >
      Login
    </a>
  );
};
