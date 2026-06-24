import type { CategoryTreeItem } from '@plentymarkets/shop-api';
import CustomCategoryPage from '../pages/custom-category.vue';

const CUSTOM_CATEGORY_IDS = new Set<number>([
  369,
  528,
]);

const addedCustomRoutePaths = new Set<string>();

const normalizeRouteName = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default defineNuxtPlugin({
  name: 'nk-override-custom-category-routes',
  async setup() {
    const router = useRouter();
    const { locale } = useI18n();
    const localePath = useLocalePath();
    const { buildCategoryMenuLink } = useLocalization();
    const { data: categoryTree, getCategoryTree } = useCategoryTree();

    const registerCustomCategoryRoutes = async () => {
      if (!categoryTree.value.length) {
        await getCategoryTree();
      }

      if (!categoryTree.value.length) {
        return;
      }

      const routesToRegister: Array<{ id: number; path: string }> = [];

      const collectRoutes = (items: CategoryTreeItem[]) => {
        for (const item of items) {
          if (CUSTOM_CATEGORY_IDS.has(item.id)) {
            routesToRegister.push({
              id: item.id,
              path: localePath(buildCategoryMenuLink(item, categoryTree.value)),
            });
          }

          if (item.children?.length) {
            collectRoutes(item.children);
          }
        }
      };

      collectRoutes(categoryTree.value);

      for (const route of routesToRegister) {
        if (addedCustomRoutePaths.has(route.path)) {
          continue;
        }

        router.addRoute({
          name: `custom-category-${route.id}-${normalizeRouteName(route.path)}`,
          path: route.path,
          component: CustomCategoryPage,
          meta: {
            sitemap: false,
          },
        });

        addedCustomRoutePaths.add(route.path);
      }
    };

    await registerCustomCategoryRoutes();

    if (import.meta.client) {
      watch(
        () => locale.value,
        async () => {
          await registerCustomCategoryRoutes();
        },
      );
    }
  },
});
