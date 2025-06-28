import {getRequestConfig} from 'next-intl';

// Can be imported from a shared config
const locales = ['en', 'id', 'th'];

export default getRequestConfig(async ({locale}) => {
  // Remove the notFound() check as middleware handles locale validation
  // This prevents the "headers called outside request scope" error
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});