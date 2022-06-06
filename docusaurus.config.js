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
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dudrhks', // Usually your GitHub org/user name.
  projectName: 'dev-blog', // Usually your repo name.
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
          alt: 'My Facebook Project Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'blog', label: 'Blog', position: 'left'},
          {to: 'blog/tags', label: 'Tags', position: 'left'},
          // Please keep GitHub link to the right for consistency.
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //   ],
          // },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },

              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
          // {
          //   title: 'Legal',
          //   // Please do not remove the privacy and terms, it's a legal requirement.
          //   items: [
          //     {
          //       label: 'Privacy',
          //       href: 'https://opensource.facebook.com/legal/privacy/',
          //     },
          //     {
          //       label: 'Terms',
          //       href: 'https://opensource.facebook.com/legal/terms/',
          //     },
          //     {
          //       label: 'Data Policy',
          //       href: 'https://opensource.facebook.com/legal/data-policy/',
          //     },
          //     {
          //       label: 'Cookie Policy',
          //       href: 'https://opensource.facebook.com/legal/cookie-policy/',
          //     },
          //   ],
          // },
        ],
        // logo: {
        //   alt: 'Facebook Open Source Logo',
        //   src: 'img/oss_logo.png',
        //   href: 'https://opensource.facebook.com',
        // },
        // Please do not remove the credits, help to publicize Docusaurus :)
        copyright: `Copyright © ${new Date().getFullYear()} Yeonggwan Han, Inc. Built with Docusaurus.`,
      },
    }),
};

module.exports = config;
