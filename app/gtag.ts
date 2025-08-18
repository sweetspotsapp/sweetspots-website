export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (url: string) => {
  if (!GA_ID) return;
  // @ts-ignore
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: url,
    page_path: url,
  });
};

export const event = (action: string, params: Record<string, any> = {}) => {
  if (!GA_ID) return;
  // @ts-ignore
  window.gtag?.('event', action, params);
};
