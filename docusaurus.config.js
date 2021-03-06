/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Malone's DevBlog",
  tagline: 'The tagline of my site',
  url: 'https://malone.im/',
  baseUrl: '/',
  favicon: '/img/favicon-32x32.png',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  organizationName: 'dudrhks', // Usually your GitHub org/user name.
  projectName: 'malone-blog', // Usually your repo name.
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          editUrl: 'https://github.com/dudrhks/malone-blog/edit/main',
          // blogSidebarCount: 100,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-W4EG287GS0',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Malone.Dev',
        logo: {
          alt: '로고',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'about', label: 'About', position: 'left'},
          {to: 'tags', label: 'Tags', position: 'left'},
          {
            href: 'https://github.com/dudrhks',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/',
              },
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dudrhks',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Yeonggwan Han, Inc. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
