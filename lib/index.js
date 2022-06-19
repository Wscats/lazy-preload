"use strict";
/**
 * 默认显示图标，Hover 时懒加载组件
 * @author: enoyao
 * @date: 2022-06-18 23:35:22
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyLoadComponent = exports.lazyWithPreload = void 0;
var react_1 = __importStar(require("react"));
function lazyWithPreload(factory) {
    var LazyComponent = react_1.lazy(factory);
    var factoryPromise;
    var LoadedComponent;
    var Component = react_1.forwardRef(function LazyWithPreload(props, ref) {
        return react_1.createElement(LoadedComponent !== null && LoadedComponent !== void 0 ? LoadedComponent : LazyComponent, Object.assign(ref ? { ref: ref } : {}, props));
    });
    Component.isLoaded = false;
    Component.preload = function () {
        if (!factoryPromise) {
            factoryPromise = factory().then(function (module) {
                Component.isLoaded = true;
                LoadedComponent = module.default;
            });
        }
        return factoryPromise;
    };
    return Component;
}
exports.lazyWithPreload = lazyWithPreload;
function LazyLoadComponent(props) {
    var _a;
    var _b = react_1.useState(false), showLazyLoadComponent = _b[0], setShowLazyLoadComponent = _b[1];
    var _c = react_1.useState(false), hasClick = _c[0], setHasClick = _c[1];
    var lazyLoadElement = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        if (hasClick) {
            (_a = lazyLoadElement === null || lazyLoadElement === void 0 ? void 0 : lazyLoadElement.current) === null || _a === void 0 ? void 0 : _a.click();
            setHasClick(false);
        }
    }, [(_a = props.lazyLoadComponent) === null || _a === void 0 ? void 0 : _a.isLoaded]);
    return (react_1.default.createElement(react_1.Suspense, { fallback: props.loading }, showLazyLoadComponent ?
        react_1.default.createElement("div", { ref: lazyLoadElement }, props.children) : react_1.default.createElement("div", { onClick: function () { return setHasClick(true); }, onMouseOver: function () {
            var _a;
            // 这里先不 await
            (_a = props.lazyLoadComponent) === null || _a === void 0 ? void 0 : _a.preload();
            setShowLazyLoadComponent(true);
        } }, props.defaultLoadComponent)));
}
exports.LazyLoadComponent = LazyLoadComponent;
