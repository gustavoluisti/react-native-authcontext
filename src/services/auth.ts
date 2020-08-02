interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'lhkjlhlhlkgiygoysudgasgVDTADSVSD',
        user: {
          name: 'Gustavo',
          email: 'spartatecnologia@gmail.com',
        },
      });
    }, 2000);
  });
}
