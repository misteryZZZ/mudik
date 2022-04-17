import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
    return (
      <Html lang="id">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}
