---
title: UI Catalog
---

# UI Catalog

`UI Catalog`は`VisualTreeAsset`、および`StyleSheet`のロード方法を集約したScriptableObjectです。  
`Assets/Resources/UICatalog.asset`に自動で生成されます。

Viewクラス、またはStyleクラスからUIアセットの読み込みを行うときに利用され、`UI Catalog`
に登録されている内容からロード方法と`UI Loader`の決定を行います。  
`UI Loader`はロードの実行を行う概念です。

ロード方法は[`HaikaraUI Attribute`](haikara-ui-attribute.md)の
`AssetReferenceMode`で決定され、`UICatalog`上にUIアセットが分類された状態で登録されます。  
分類されたアセットはそれぞれ`UIAssetInfo<T>`というクラスとして、`uxmlAssets`または`styleAssets`に保存されます。

## Automated Generating

`UI Catalog`は[`DidReloadScripts`](https://docs.unity3d.com/ScriptReference/Callbacks.DidReloadScripts.html)のタイミングで
`Assets/Resources/UICatalog.asset`に生成されます。  
このパスは固定です。

## Manual Generate UI Catalog

自動生成の他に、`UI Catalog`の生成を手動で実行することも可能です。  
メニューバーを `Haikara > Regenerate UI Catalog` の順で選択することで生成処理が実行されます。  

## `UIAssetInfo<T>`

`UIAssetInfo<T>`には次の種類が存在します。

| `UIAssetInfo<T>`の種類  | `AsetReferenceMode` | `IUILoader`の種類      |
|----------------------|---------------------|---------------------|
| `ResourceUIInfo<T>`  | `Resource`          | `ResourceUILoader`  |
| `AssetPathUIInfo<T>` | `AssetPath`         | `AssetPathUILoader` |
| `CustomUIInfo<T>`    | `Custom`            | `CustomUILoader`    |

### `ResourceUIInfo<T>`

`[HaikaraUI]`で指定された`AssetReferenceMode`が`Resource`のとき、またはデフォルトのとき、UIアセットの情報は
`ResourceUIInfo<T>`として登録されます。  
UIアセットのGuidとアセットの実体が保存されており、読み込み時には直接それが渡されます。  
`ResourceUIInfo<T>`が使われる場合は、ビルドの中に直接アセットが含まれることに注意してください。

### `AssetPathUIInfo<T>`

`AssetReferenceMode`が`AssetPath`のとき、UIアセットの情報は `AssetPathUIInfo<T>`として登録されます。  
UIアセットのGuidと、UnityEditor上でのアセットのパスが保存されています。  
**この`UIAssetInfo<T>`はEditorOnlyです**

### `CustomUIInfo<T>`

`AssetReferenceMode`が`Custom`のとき、UIアセットの情報は`CustomUIInfo<T>`として登録されます。  
内部にはUIアセットのGuidのみが保存されています。  
ここに登録されたUIアセットは、別途定義した[`Custom UI Loader`](#custom-ui-loader)によってロードされます。

## `UI Loader`

UIアセットの読み込みを実際に行う、`IUILoader`インターフェースを実装したクラスです。
次の3つの`UI Loader`が存在します。

### `Asset Path UI Loader`

UIアセットのパスからUIアセットを読み込む`UI Loader`です。  
`UnityEditor.AssetDatabase.LoadAssetAtPath<T>()`からアセットをロードします。  
**この `UI Loader`はEditorOnlyです**

### `Resource UI Loader`

`UI Catalog`上に保存されているアセットの実体を直接読み込むことができる`UI Loader`です。

### `Custom UI Loader`

`Custom UI Loader`はUIのロード方法を独自に定義することができる`UI Loader`です。  
利用するには`CustomUILoader<T>`を継承するクラスを作成し、次のサンプルコードのように`UI Catalog`に登録する必要があります。

```csharp

    RuntimeUICatalog.Instance.UxmlUICollection.RegisterCustomUILoader(
        new AddressablesUILoader<VisualTreeAsset>()
    );
    
    RuntimeUICatalog.Instance.UssUICollection.RegisterCustomUILoader(
        new AddressablesUILoader<StyleSheet>()
    );

```

参考: [Addressables Ui Loader](../addressables-support/addressables-ui-loader)
