import React, { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-stone-100 dark:bg-slate-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
