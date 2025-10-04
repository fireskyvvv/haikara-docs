---
title: Addressables UI Loader
---

# Addressables UI Loader

The `Addressables UI Loader` is a [`UI Loader`](../source-generation/ui-catalog.md#ui-loader) that loads UI assets (.uxml, .uss) using Unity's [Addressables](https://docs.unity3d.com/ja/Packages/com.unity.addressables@1.20/manual/index.html) system.  
It treats the Guid of the UI asset as an address and loads the UI asset using `Addressables.LoadAssetAsync<T>`.

```csharp
        public override TAsset? Load(CustomUIInfo<TAsset> uiAssetInfo)
        {
            if (_idToHandle.TryGetValue(uiAssetInfo.Id, out var currentHandle))
            {
                return currentHandle.WaitForCompletion();
            }
            
            var handle = Addressables.LoadAssetAsync<TAsset>(uiAssetInfo.Id);
            var result = handle.WaitForCompletion;
            _idToHandle.Add(uiAssetInfo.Id, handle);
            return result;
        }
```

When the `AssetReferenceMode` specified by [`[HaikaraUI]`](../source-generation/haikara-ui-attribute.md#haikaraui-attribute) is `Resource`, the actual asset is included directly in the [`UI Catalog`](../source-generation/ui-catalog.md), and built into your project.  
In this case, loading the `UI Catalog` will load all UI assets into memory at once, which can become a memory bottleneck for projects with many UI assets.  
By using the `Addressables UI Loader`, you can load UI assets into memory only when needed, avoiding such bottlenecks.

The following image shows the Memory Profiler when toggling display of a dialog UI registered via the `Addressables UI Loader`.  
![memory-profile-result](/assets/guide/addressables-support/memory-profile-result.png)

## Addressables Group Maker

A dedicated tool is provided for setting up Addressables for use with the `Addressables UI Loader`.  
You can launch the tool from the menu bar at `Haikara > Addressables > Group Maker Window`.  
It creates Addressables Groups for each .uxml and .uss, and adds each UI asset as an entry.