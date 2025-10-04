---
title: HaikaraUI Attribute
---

# HaikaraUI Attribute

`[HaikaraUI]`は.uxml(または.uss)のファイルに紐づくクラスであると認識させるために必要なAttributeです。  
SourceGeneratorはまず最初に、このAttributeが付与されているクラスを収集します。

## Parameters

| パラメータ         | 型                    | 必須 | 初期値                           |
|---------------|----------------------|----|-------------------------------|
| ReferenceMode | `AssetReferenceMode` | no | `AssetReferenceMode.Resource` |

- **ReferenceMode**
  `ReferenceMode`は、そのUIアセット(`VisualTreeAsset`または`StyleSheet`)をどこからロードするかを決定します。
    - **Resource**  
      `Resource`を指定すると、[`UICatalog`](ui-catalog.md#ui-loader)にUIアセットの実体が登録され、ロード時にインスタンス化します
    - **AssetPath**(Editor Only)  
      `AssetPath`を指定すると、[`UICatalog`](ui-catalog.md#ui-loader)にUIアセットのパスが登録されます。  
      `UnityEditor.AssetDatabase.LoadAssetAtPath<T>()`を使ってUIアセットのパスからロードを行います。
    - **Custom**  
      自身で定義した[`UILoader`](ui-catalog.md#ui-loader)を利用してUIのロードを行います。  
      `Custom`を指定した場合は、定義した`UILoader`を[`UICatalog`](ui-catalog.md)に登録する必要があります。  
      参考: [`AddressablesUILoader`](../addressables-support/addressables-ui-loader.md)