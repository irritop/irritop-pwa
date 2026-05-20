import type { RouteLocationNormalized } from 'vue-router';

export default defineNuxtPlugin({
  name: 'blocks',
  parallel: true,
  async setup() {
    const router = useRouter();
    const { $i18n } = useNuxtApp();
    const { isInEditor } = useEditorState();
    const { fetchProducts, loadFakeGlobalCategoryData, data: productsCatalog } = useProducts();

    const fetchForRoute = async (to: RouteLocationNormalized) => {
      const { meta } = to;

      if (meta.skipBlocksFetch) return;
      const hasBlockIdentifier = meta.isBlockified && meta.identifier !== undefined;
      const type = (hasBlockIdentifier && meta.type ? meta.type : 'immutable') as string;

      if (type === 'category') {
        if (isToGlobalCategoryTemplate(to) && isInEditor.value) {
          loadFakeGlobalCategoryData($i18n.locale.value);
        } else {
          const { getFacetsFromURL, checkFiltersInURL } = useCategoryFilter(to);
          await fetchProducts(getFacetsFromURL()).then(() => checkFiltersInURL());
        }
      }

      /** NK Add line 28 and chnaged 27 and 29, to get the correct category identifier when we override the default behavior in our custom pages */
      const categoryIdentifier = meta.useCategoryIdAsIdentifier
        ? (productsCatalog.value.category?.id ?? 0)
        : (productsCatalog.value.category?.type === 'content' ? productsCatalog.value.category?.id : 0);
      const staticIdentifier = hasBlockIdentifier ? meta.identifier : 'index';
      const blockIdentifier = type === 'category' ? categoryIdentifier : staticIdentifier;

      const { fetchBlocks } = useBlocks();
      await fetchBlocks(blockIdentifier as string | number, type);
    };

    await fetchForRoute(router.currentRoute.value);

    if (import.meta.client) {
      router.beforeResolve(async (to) => {
        await fetchForRoute(to);
      });
    }
  },
});
