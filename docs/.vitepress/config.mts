import {defineConfig} from 'vitepress'
import {generateSidebar} from 'vitepress-sidebar';
import {withSidebar} from 'vitepress-sidebar';
import {withI18n} from 'vitepress-i18n';

const rootLocale = 'ja'
const supportedLocales = [rootLocale, 'en'];

const vitePressConfigs = {
    base: `/haikara-docs/`,
    title: "Haikara",
    description: "A VitePress Site",
    rewrites: {
        [`${rootLocale}/:rest*`]: ':rest*',
    },
    themeConfig: {
        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    },
    ignoreDeadLinks: true, // todo set false
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
            documentRootPath: `/docs/${lang}/guide/`,
            resolvePath: rootLocale === lang ? '/guide/' : `/${lang}/guide/`,
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
    locales: ['ja', 'en'],
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
                    link: '/reference/one'
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
                    link: '/en/guide/what-is-haikara'
                },
                {
                    text: 'Reference',
                    link: '/en/reference/one'
                }
            ]
        },
    }
};

export default defineConfig(withI18n(withSidebar(vitePressConfigs, vitePressSidebarConfigGuide), vitePressI18nConfigs))

