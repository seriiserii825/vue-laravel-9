import {E_LayoutToFileMap} from "../enum/E_LayoutToFileMap";

export async function loadLayoutMiddleware(route: any) {
    const {layout} = route.meta;
    const normalizedLayoutName: string = layout || 'default';
    const fileName = E_LayoutToFileMap[normalizedLayoutName];
    const fileNameWithoutExtension = fileName.split('.vue')[0];

    const component = await import(
        `../layouts/${fileNameWithoutExtension}.vue`
        );
    route.meta.layout_component = component.default;
}
