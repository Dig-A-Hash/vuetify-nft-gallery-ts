import { useSeoMeta } from '@unhead/vue';
import { SITE_TITLE } from '../modules/constants';

const baseUrl = 'https://vuetify-nft-gallery-ts.vercel.app';

export function useSeo(pageTitle, description) {
  const seoValues = {
    title: SITE_TITLE,
    description:
      'A demo showing how to display NFTs by implementing the vue-evm-nft package with Vuetify and Vue using TypeScript. Compatible with any EVM compatible blockchain like Ethereum, Binance Smart Chain, Avalanche C-Chain, and Polygon.',
    imageUrl: `${baseUrl}/img/services/dig-a-hash-wide.png`,
    url: baseUrl,
    type: 'website',
    twitterCard: 'summary_large_image',
  };
  const title = pageTitle
    ? `${pageTitle} - ${seoValues.title}`
    : seoValues.title;
  const desc = description ? description : seoValues.description;
  useSeoMeta({
    // Robot control
    robots: 'index, follow',

    // title
    title: title,
    ogTitle: title,
    twitterTitle: title,

    // description
    description: desc,
    ogDescription: desc,
    twitterDescription: desc,

    // website, or article.
    ogType: 'website',

    // Do not need to change.
    ogImageUrl: seoValues.imageUrl,
    twitterImage: seoValues.imageUrl,
    ogUrl: seoValues.url,
    twitterCard: seoValues.twitterCard,
  });
}
