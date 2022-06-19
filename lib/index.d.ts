/**
 * 默认显示图标，Hover 时懒加载组件
 * @author: enoyao
 * @date: 2022-06-18 23:35:22
 */
import React, { ComponentType } from "react";
export declare type PreloadableComponentPreload = {
    preload: () => Promise<void>;
    isLoaded: boolean;
};
export declare type PreloadableComponent<T extends ComponentType<any>> = T & PreloadableComponentPreload;
export declare function lazyWithPreload<T extends ComponentType<any>>(factory: () => Promise<{
    default: T;
}>): PreloadableComponent<T>;
export declare function LazyLoadComponent(props: {
    defaultLoadComponent: JSX.Element;
    loading: JSX.Element;
    children?: React.ReactChild | React.ReactChild[];
    lazyLoadComponent?: PreloadableComponentPreload;
}): JSX.Element;
