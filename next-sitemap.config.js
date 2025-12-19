/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://hizirmatik.com.tr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Sayfa önceliklerini özelleştir
    const priorityMap = {
      '/': 1.0,
      '/doviz-altin': 0.9,
      '/ai-mutfak': 0.9,
      '/metin-doktoru': 0.8,
      '/finans/kredi-hesaplama': 0.8,
      '/finans/mevduat-hesaplama': 0.8,
      '/blog': 0.7,
      '/hakkimizda': 0.5,
      '/iletisim': 0.5,
      '/gizlilik-politikasi': 0.3,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
