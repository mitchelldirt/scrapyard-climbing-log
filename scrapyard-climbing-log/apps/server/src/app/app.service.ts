import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getUserRoles(userId: string) {
    console.log(userId);
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"URQYujDsdoP7EkqUr91PhbGd6QNmEDTh","client_secret":"UYCSeBDVqszOFZxeTzl-wryM8UcPJBlzMNVgY5VzXFdsNiMQn_LtK6z9QP-vAOE0","audience":"https://dev-w15ewae8dmum4hfo.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
    };

    const request = await fetch(
      'https://dev-w15ewae8dmum4hfo.us.auth0.com/oauth/token',
      options
    );

    const tokenJSON = await request.json();
    const authToken = tokenJSON.access_token;

    const data = await fetch(
      `https://dev-w15ewae8dmum4hfo.us.auth0.com/api/v2/users/${encodeURIComponent(
        userId
      )}/roles`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      }
    );

    return await data.json();
  }
}
