import * as React from 'react';
import * as THREE from 'three';
import { type WebGLRenderTargetOptions } from 'three';
type FBOSettings = {
    depth?: boolean;
} & WebGLRenderTargetOptions;
export declare function useFBO(width?: number | FBOSettings, height?: number, settings?: FBOSettings): THREE.WebGLRenderTarget<THREE.Texture>;
type UseFBOParams = Parameters<typeof useFBO>;
type Fbo = ReturnType<typeof useFBO>;
export type FboProps = {
    children?: (target: Fbo) => React.ReactNode;
    width?: UseFBOParams[0];
    height?: UseFBOParams[1];
} & FBOSettings;
export declare const Fbo: React.ForwardRefExoticComponent<{
    children?: (target: Fbo) => React.ReactNode;
    width?: UseFBOParams[0];
    height?: UseFBOParams[1];
} & {
    depth?: boolean;
} & THREE.WebGLRenderTargetOptions & React.RefAttributes<THREE.WebGLRenderTarget<THREE.Texture>>>;
export {};
