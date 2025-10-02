---
title: Addressables UI Loader
---

# Addressables UI Loader

`Addressables UI Loader` は、Unity
の [Addressables](https://docs.unity3d.com/ja/Packages/com.unity.addressables@1.20/manual/index.html) システムを利用して
UIアセット（.uxml,.uss）をロードするための[`UI Loader`](../haikara-core/ui-catalog.md#ui-loader)です。  
UIアセットのGuidをアドレスとして扱い、`Addressables.LoadAssetAsync<T>`でUIアセットのロードを実行します。

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

[`[HaikaraUI]`](../haikara-core/haikara-ui-attribute.md#haikaraui-attribute)で指定した`AssetReferenceMode`が`Resource`
のとき、[`UI Catalog`](../haikara-core/ui-catalog.md)に直接アセットの実体が含まれ、ビルドされます。  
この場合、`UI Catalog`
をロードすると全てのUIアセットがメモリ上に展開されることになり、UIアセットを多く使用するプロジェクトではメモリ使用量がボトルネックになることが考えられます。  
`Addressables UI Loader`を通すことで、必要になった場合だけUIアセットをメモリ上にロードすることができるようになり、これらを回避することができます。  

次の画像は`Addressables UI Loader`にダイアログのUIを登録し、表示/非表示を切り替えた時のMemory Profilerの様子です。    
[`AddressablesSample`](todo url)で確認することができます。
[todo 画像]


## Addressables Builder

`Addressables UI Loader`に対応するAddressablesの設定を行うための専用のツールを用意しています。  
メニューバーの `Haikara > Addressables > BuilderWindow` からツールを起動することができます。  
