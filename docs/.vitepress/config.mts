import {defineConfig} from 'vitepress'
import {withSidebar} from 'vitepress-sidebar';
import {withI18n} from 'vitepress-i18n';

const rootLocale = 'ja'
const supportedLocales = [rootLocale, 'en'];

const vitePressConfigs = {
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/haikara-docs/assets/logo.svg'}],
    ],
    base: `/haikara-docs/`,
    title: "Haikara",
    description: "A VitePress Site",
    rewrites: {
        [`${rootLocale}/:rest*`]: ':rest*',
    },
    themeConfig: {
        logo: '/assets/logo.svg',
        socialLinks: [
            {icon: 'github', link: 'https://github.com/fireskyvvv/Haikara'},
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

