---
title: HaikaraUI Attribute
---

# HaikaraUI Attribute

`[HaikaraUI]` is an attribute required to recognize a class as being associated with a .uxml (or .uss) file.  
The SourceGenerator first collects classes that have this attribute.

## Parameters

| Parameter       | Type                  | Required | Default Value                      |
|-----------------|----------------------|----------|------------------------------------|
| ReferenceMode   | `AssetReferenceMode` | no       | `AssetReferenceMode.Resource`      |

- **ReferenceMode**
  `ReferenceMode` determines where to load the UI asset (`VisualTreeAsset` or `StyleSheet`) from.
    - **Resource**  
      If `Resource` is specified, the actual UI asset will be registered in the [`UICatalog`](ui-catalog.md#ui-loader) and instantiated at load time.
    - **AssetPath** (Editor Only)  
      If `AssetPath` is specified, the asset path will be registered in the [`UICatalog`](ui-catalog.md#ui-loader).  
      The asset will be loaded from the path using `UnityEditor.AssetDatabase.LoadAssetAtPath<T>()`.
    - **Custom**  
      UI loading will be performed using a user-defined [`UILoader`](ui-catalog.md#ui-loader).  
      If `Custom` is specified, you must register the defined `UILoader` with the [`UICatalog`](ui-catalog.md).  
      Reference: [`AddressablesUILoader`](../addressables-support/addressables-ui-loader.md)