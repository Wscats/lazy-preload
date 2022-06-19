/**
 * 默认显示图标，Hover 时懒加载组件
 * @author: enoyao
 * @date: 2022-06-18 23:35:22
 */

 import React, { ComponentType, createElement, forwardRef, lazy, Suspense, useState, useRef, useEffect } from "react";

 export type PreloadableComponentPreload = {
   preload: () => Promise<void>;
   isLoaded: boolean;
 }
 
 export type PreloadableComponent<T extends ComponentType<any>> = T & PreloadableComponentPreload;
 
 export function lazyWithPreload<T extends ComponentType<any>>(
   factory: () => Promise<{ default: T }>
 ): PreloadableComponent<T> {
   const LazyComponent = lazy(factory);
   let factoryPromise: Promise<void> | undefined;
   let LoadedComponent: T | undefined;
 
   const Component = (forwardRef(function LazyWithPreload(props, ref) {
     return createElement(
       LoadedComponent ?? LazyComponent,
       Object.assign(ref ? { ref } : {}, props) as any
     );
   }) as any) as PreloadableComponent<T>;
 
   Component.isLoaded = false;
   Component.preload = () => {
     if (!factoryPromise) {
       factoryPromise = factory().then((module) => {
         Component.isLoaded = true;
         LoadedComponent = module.default;
       });
     }
 
     return factoryPromise;
   };
   return Component;
 }
 
 export function LazyLoadComponent(props: {
   defaultLoadComponent: JSX.Element;
   loading: JSX.Element;
   children?: | React.ReactChild | React.ReactChild[];
   lazyLoadComponent?: PreloadableComponentPreload;
 }) {
   const [showLazyLoadComponent, setShowLazyLoadComponent] = useState(false);
   const [hasClick, setHasClick] = useState(false);
   const lazyLoadElement = useRef<HTMLDivElement>(null);
   useEffect(() => {
     if (hasClick) {
       lazyLoadElement?.current?.click();
       setHasClick(false);
     }
   }, [props.lazyLoadComponent?.isLoaded])
 
   return (
     <Suspense fallback={props.loading}>
       {showLazyLoadComponent ?
         <div ref={lazyLoadElement}>
           {props.children}
         </div> : <div
           onClick={() => setHasClick(true)}
           onMouseOver={() => {
             // 这里先不 await
             props.lazyLoadComponent?.preload();
             setShowLazyLoadComponent(true);
           }}
         >
           {props.defaultLoadComponent}
         </div>}
     </Suspense>
   );
 }
 