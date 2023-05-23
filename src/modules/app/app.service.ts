import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';

@Injectable()
export class AppService {
  constructor(private readonly categoryService: CategoryService) {}
  async getCategories() {
    return this.categoryService.findAll();
  }
  async getLabels() {
    return [
      {
        name: 'Bitcoin',
        slug: 'bitcoin',
      },
      {
        name: 'Ethereum',
        slug: 'ethereum',
      },
    ];
  }
  async getWeeklyArticles() {
    return [
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
    ];
  }
  async getTopArticles() {
    return [
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
    ];
  }
  async getTopArticlesByCategory() {
    return [
      {
        international: [
          {
            title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
            slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
            summary:
              'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
            bannerImgUrl: '/images/news1.jpg',
            isPremium: false,
            category: {
              name: 'International Sports',
              slug: 'international-sports',
            },
            publishedAt: new Date(),
            createdBy: 'admin',
          },
          {
            title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
            slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
            summary:
              'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
            bannerImgUrl: '/images/news1.jpg',
            isPremium: false,
            category: {
              name: 'International Sports',
              slug: 'international-sports',
            },
            publishedAt: new Date(),
            createdBy: 'admin',
          },
        ],
      },
    ];
  }
  async searchArticles(query: any) {
    return [
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
    ];
  }
  async getArticleBySlug(slug: string) {
    console.log(slug);
    return {
      title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
      slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
      summary:
        'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
      bannerImgUrl: '/images/news1.jpg',
      isPremium: false,
      category: {
        name: 'International Sports',
        slug: 'international-sports',
      },
      publishedAt: new Date(),
      createdBy: 'admin',
    };
  }
  async getRelatedArticles(article: any) {
    console.log(article);
    return [
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
      {
        title: 'The 10 Most Important Cryptocurrencies Other Than Bitcoin',
        slug: 'the-10-most-important-cryptocurrencies-other-than-bitcoin',
        summary:
          'Bitcoin has not just been a trendsetter, ushering in a wave of cryptocurrencies built on a decentralized peer-to-peer network, it’s become the de facto standard for cryptocurrencies, inspiring an ever-growing legion of followers and spinoffs.',
        bannerImgUrl: '/images/news1.jpg',
        isPremium: false,
        category: {
          name: 'International Sports',
          slug: 'international-sports',
        },
        publishedAt: new Date(),
        createdBy: 'admin',
      },
    ];
  }
}
