const urls_name = 'carousel-dataurls';
const selected_src_name = 'carousel-selected-src';

export function getCachedImgs() {
  try {
    const dataUrlsJson = sessionStorage.getItem(urls_name);
    if (!dataUrlsJson) {
      return [];
    }

    const dataUrls = JSON.parse(dataUrlsJson);
    return dataUrls;
  } catch (error) {
    return [];
  }
}

export function addCachedImg(dataUrl) {
  try {
    const currentItems = getCachedImgs();
    const allItems = [...currentItems, dataUrl];
    const json = JSON.stringify(allItems);
    sessionStorage.setItem(urls_name, json);
  } catch (error) {}
}

export function getCachedSelectedSrc() {
  try {
    const selectedSrc = sessionStorage.getItem(selected_src_name);
    return selectedSrc ?? null;
  } catch (error) {
    return null;
  }
}

export function setCachedSelectedImg(src) {
  try {
    sessionStorage.setItem(selected_src_name, src);
  } catch (error) {}
}
