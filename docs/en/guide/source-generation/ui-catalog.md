---
title: UI Catalog
---

# UI Catalog

`UI Catalog` is a ScriptableObject that aggregates loading methods for `VisualTreeAsset` and `StyleSheet`.  
It is automatically generated at `Assets/Resources/UICatalog.asset`.

It is used when loading UI assets from View classes or Style classes, and determines the loading method and `UI Loader` from the contents registered in the `UI Catalog`.  
A `UI Loader` is the concept that performs the loading.

The loading method is determined by the `AssetReferenceMode` of the [`HaikaraUI Attribute`](haikara-ui-attribute.md), and UI assets are registered in the `UICatalog` classified by type.  
The classified assets are stored as a class called `UIAssetInfo<T>` in either `uxmlAssets` or `styleAssets`.

## Automated Generating

`UI Catalog` is generated at `Assets/Resources/UICatalog.asset` at the timing of [`DidReloadScripts`](https://docs.unity3d.com/ScriptReference/Callbacks.DidReloadScripts.html).  
This path is fixed.

## Manual Generate UI Catalog

In addition to automatic generation, you can also manually generate the `UI Catalog`.  
Select `Haikara > Regenerate UI Catalog` from the menu bar to execute the generation process.

## `UIAssetInfo<T>`

There are the following types of `UIAssetInfo<T>`:

| Type of `UIAssetInfo<T>`  | `AsetReferenceMode` | Type of `IUILoader`    |
|---------------------------|--------------------|------------------------|
| `ResourceUIInfo<T>`       | `Resource`         | `ResourceUILoader`     |
| `AssetPathUIInfo<T>`      | `AssetPath`        | `AssetPathUILoader`    |
| `CustomUIInfo<T>`         | `Custom`           | `CustomUILoader`       |

### `ResourceUIInfo<T>`

When `AssetReferenceMode` specified by `[HaikaraUI]` is `Resource` or the default, UI asset information is registered as `ResourceUIInfo<T>`.  
The Guid and actual asset are saved, and are passed directly at load time.  
Note that when using `ResourceUIInfo<T>`, the asset is included directly in your build.

### `AssetPathUIInfo<T>`

When `AssetReferenceMode` is `AssetPath`, UI asset information is registered as `AssetPathUIInfo<T>`.  
The Guid and UnityEditor asset path are saved.  
**This `UIAssetInfo<T>` is EditorOnly**

### `CustomUIInfo<T>`

When `AssetReferenceMode` is `Custom`, UI asset information is registered as `CustomUIInfo<T>`.  
Internally, only the Guid is saved.  
Assets registered here are loaded by a separately defined [`Custom UI Loader`](#custom-ui-loader).

## `UI Loader`

A `UI Loader` is a class that implements the `IUILoader` interface and actually performs the loading of UI assets.
There are three types of `UI Loader`:

### `Asset Path UI Loader`

A `UI Loader` that loads UI assets from a path.  
Assets are loaded using `UnityEditor.AssetDatabase.LoadAssetAtPath<T>()`.  
**This `UI Loader` is EditorOnly**

### `Resource UI Loader`

A `UI Loader` that can directly load the actual asset saved in the `UI Catalog`.

### `Custom UI Loader`

A `Custom UI Loader` allows you to define your own way of loading UI assets.  
To use it, create a class that inherits from `CustomUILoader<T>`, and register it to the `UI Catalog` as in the sample code below.

```csharp

    RuntimeUICatalog.Instance.UxmlUICollection.RegisterCustomUILoader(
        new AddressablesUILoader<VisualTreeAsset>()
    );
    
    RuntimeUICatalog.Instance.UssUICollection.RegisterCustomUILoader(
        new AddressablesUILoader<StyleSheet>()
    );

```

Reference: [Addressables Ui Loader](../addressables-support/addressables-ui-loader)