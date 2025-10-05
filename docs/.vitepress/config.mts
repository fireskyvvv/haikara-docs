import {defineConfig} from 'vitepress'
import {withSidebar} from 'vitepress-sidebar';
import {withI18n} from 'vitepress-i18n';

const rootLocale = 'ja'
const supportedLocales = [rootLocale, 'en'];

const vitePressConfigs = {
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/haikara-docs/assets/logo.svg'}],
        ["meta", {property: "og:site_name", content: "haikara-docs"}],
        ["meta", {property: "twitter:card", content: "summary"}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:image', content: 'https://fireskyvvv.github.io/haikara-docs/assets/ogimage.jpg'}],
    ],
    base: `/haikara-docs/`,
    title: "Haikara",
    description: "Haikara Document Site",
    rewrites: {
        [`${rootLocale}/:rest*`]: ':rest*',
    },
    themeConfig: {
        logo: '/assets/logo.svg',
        socialLinks: [
            {icon: 'github', link: 'https://github.com/fireskyvvv/Haikara'},
            {icon: 'x', link: 'https://x.com/fireskyvvv'},
        ]
    },
}

const commonSidebarConfigs = {
    collapsed: true,
    frontmatterTitleFieldName: 'title',
    useTitleFromFrontmatter: true,
    sortMenusByFrontmatterOrder: true,
    useFolderTitleFromIndexFile: true,
    frontmatterOrderDefaultValue: 10000,
}

const vitePressSidebarConfigGuide = [
    ...supportedLocales.map((lang) => {
        return {
            ...commonSidebarConfigs,
            ...(rootLocale === lang ? {} : {basePath: `/${lang}/`}),
            documentRootPath: `/docs/${lang}`,
            resolvePath: rootLocale === lang ? '/' : `/${lang}/`,
            // SortFolder
            manualSortFileNameByPriority: [
                'introduction',
                'haikara-core-attribute.md',
                'view',
                `view-installer.md`,
                `view-source-generation.md`,
                'bindable-properties',
                'view-classes',
                'source-generation',
            ],

        };
    }),
    ...supportedLocales.map((lang) => {
        return {
            ...commonSidebarConfigs,
            ...(rootLocale === lang ? {} : {basePath: `/${lang}/`}),
            documentRootPath: `/docs/${lang}/reference`,
            resolvePath: rootLocale === lang ? '/reference/' : `/${lang}/reference/`,
        };
    }),
]

const vitePressI18nConfigs = {
    locales: supportedLocales,
    rootLocale: rootLocale,
    searchProvider: 'local',
    themeConfig: {
        ja: {
            nav: [
                {
                    text: 'Home',
                    link: '/'
                },
                {
                    text: 'Guide',
                    link: '/guide/introduction/what-is-haikara'
                },
                {
                    text: 'Reference',
                    link: '/reference/index'
                }
            ]
        },
        en: {
            nav: [
                {
                    text: 'Home',
                    link: '/en'
                },
                {
                    text: 'Guide',
                    link: '/en/guide/introduction/what-is-haikara'
                },
                {
                    text: 'Reference',
                    link: '/en/reference/index'
                }
            ]
        },
    }
};

export default defineConfig(withI18n(withSidebar(vitePressConfigs, vitePressSidebarConfigGuide), vitePressI18nConfigs))

