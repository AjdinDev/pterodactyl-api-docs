import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const path = require('path');

const siteUrl = 'https://pteroapi.com';
const githubRepoUrl = 'https://github.com/AjdinDev/pterodactyl-api-docs';

const config: Config = {
  title: 'Pterodactyl API Documentation',
  tagline: 'Complete API reference and developer guide for Pterodactyl Panel v1 - Server management made easy',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'AjdinDev',
  projectName: 'pterodactyl-api-docs',

  onBrokenLinks: 'warn', // Allow broken links for now during development
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Improve SEO with better configuration
  trailingSlash: false, // Better for SEO consistency
  noIndex: false, // Allow indexing
  
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enhanced head tags for better SEO
  headTags: [
    // Preconnect to external domains for performance
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    // Web App Manifest
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    // Apple touch icon
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
    // Structured data for the website
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Website',
        name: 'PteroAPI',
        url: siteUrl,
        description: 'Complete API reference and developer guide for Pterodactyl Panel'
      }),
    },
    // Structured data for the documentation
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        name: 'Pterodactyl Panel API Documentation',
        description: 'Complete API reference and developer guide for Pterodactyl Panel',
        url: siteUrl,
        publisher: {
          '@type': 'Organization',
          name: 'PteroAPI',
          logo: `${siteUrl}/img/logo.svg`
        },
        about: {
          '@type': 'SoftwareApplication',
          name: 'Pterodactyl Panel',
          applicationCategory: 'Server Management Software',
          operatingSystem: 'Linux'
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Developers'
        },
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        keywords: 'pterodactyl, api, documentation, server management, game servers, REST API, developer guide'
      }),
    },
  ],

  plugins: [
    // Local Search Plugin (works immediately)
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Whether to index docs pages
        indexDocs: true,
        
        // Whether to index blog posts
        indexBlog: false,
        
        // Whether to index static pages
        indexPages: false,
        
        // Language of your documentation, supports multiple languages
        language: ["en"],
      },
    ],
    // Simple Social Cards Plugin
    [
      path.resolve(__dirname, './plugins/simple-social-cards'),
      {},
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Enable GitHub edit links
          editUrl: `${githubRepoUrl}/tree/main/`,
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          // Add breadcrumbs for better navigation and SEO
          breadcrumbs: true,
          // Enable versioning
          includeCurrentVersion: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v1.0+',
              path: '',
            },
            '0.7': {
              label: 'v0.7 (Legacy)',
              path: 'v0.7',
              banner: 'unmaintained',
            },
          },
        },
        blog: false, // Disable blog for API docs
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.8,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Enhanced meta image for social sharing
    image: 'img/pteroapi-social-card.jpg',
    
    // Giscus configuration
    giscus: {
      repo: process.env.GISCUS_REPO,
      repoId: process.env.GISCUS_REPO_ID,
      category: 'Pages',
      categoryId: process.env.GISCUS_CATEGORY_ID,
    },
    
    // Comprehensive metadata for SEO
    metadata: [
      // Basic SEO meta tags
      {name: 'description', content: 'Complete API reference and developer guide for Pterodactyl Panel v1. Learn to build applications with server management, file operations, database management, and more.'},
      {name: 'keywords', content: 'pterodactyl api, server management api, game server hosting, rest api documentation, panel api, hosting automation, server control api, game hosting api'},
      {name: 'author', content: 'PteroAPI contributors'},
      {name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'},
      {name: 'googlebot', content: 'index, follow'},
      
      // Open Graph meta tags for social sharing
      {property: 'og:site_name', content: 'PteroAPI'},
      {property: 'og:type', content: 'website'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:title', content: 'PteroAPI - Pterodactyl API Documentation'},
      {property: 'og:description', content: 'Complete API reference and developer guide for Pterodactyl Panel v1. Learn to build applications with server management, file operations, database management, and more.'},
      {property: 'og:url', content: siteUrl},
      {property: 'og:image', content: `${siteUrl}/img/social/_docs_api_client.jpg`},
      {property: 'og:image:alt', content: 'PteroAPI Pterodactyl API Documentation'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {property: 'og:image:type', content: 'image/jpeg'},
      
      // Twitter Card meta tags
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'PteroAPI - Pterodactyl API Documentation'},
      {name: 'twitter:description', content: 'Complete API reference and developer guide for Pterodactyl Panel v1. Learn to build applications with server management, file operations, database management, and more.'},
      {name: 'twitter:image', content: `${siteUrl}/img/social/_docs_api_client.jpg`},
      {name: 'twitter:image:alt', content: 'PteroAPI Pterodactyl API Documentation'},
      
      // Additional SEO meta tags
      {name: 'theme-color', content: '#1a365d'},
      {name: 'msapplication-TileColor', content: '#1a365d'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
      {name: 'apple-mobile-web-app-title', content: 'PteroAPI'},
      
      // Web App Manifest
      {name: 'mobile-web-app-capable', content: 'yes'},
      {name: 'application-name', content: 'PteroAPI'},
      

    ],

    // Enhanced color mode configuration
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'Pterodactyl API Documentation',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Pterodactyl API Reference',
        },
        {
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
        },
        {
          label: 'Pterodactyl GitHub',
          href: 'https://github.com/pterodactyl/panel',
          position: 'right',
          'aria-label': 'Pterodactyl Panel GitHub Repository',
        },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'API Reference',
              to: '/docs/intro',
            },
            {
              label: 'Authentication',
              to: '/docs/authentication',
            },
            {
              label: 'Rate Limits',
              to: '/docs/rate-limiting',
            },
            {
              label: 'Error Handling',
              to: '/docs/error-handling',
            },
          ],
        },
        {
          title: 'API Endpoints',
          items: [
            {
              label: 'Client API',
              to: '/docs/api/client',
            },
            {
              label: 'Application API',
              to: '/docs/api/application',
            },
            {
              label: 'WebSocket API',
              to: '/docs/api/websocket',
            }
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'Pterodactyl GitHub',
              href: 'https://github.com/pterodactyl',
              'aria-label': 'Pterodactyl GitHub Organization',
            },
            {
              label: 'Documentation Issues',
              href: `${githubRepoUrl}/issues`,
              'aria-label': 'Report Documentation Issues',
            },
          ],
        },
      ],
      logo: {
        alt: 'PteroAPI Footer Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        href: siteUrl,
        width: 32,
        height: 32,
      },
      copyright: `Copyright © ${new Date().getFullYear()} PteroAPI contributors. Shared freely for developers.`,
    },
    
    // Enhanced table of contents
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'php', 'python', 'java', 'csharp', 'ruby', 'go'],
    },
    
    // Algorithm for better internal linking
    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
