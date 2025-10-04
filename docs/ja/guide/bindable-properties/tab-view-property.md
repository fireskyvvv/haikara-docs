---
title: TabView Property
---

# TabViewProperty

[`TabView`](https://docs.unity3d.com/Manual/UIE-uxml-element-TabView.html)
のバインディングを宣言するときに利用する[`BindableProperty`](bindable-property.md)です。

## 宣言の方法

[`BindableProperty`](bindable-property.md)と同様に`TabViewProperty<T>.Create()`を呼び出すことで宣言ができます。  
`<T>`は`TabView`にバインディングしたいViewModelの型を指定します。

```csharp
private static readonly TabViewProperty<ShowcaseViewModel> TabProperty =
    TabViewProperty<ShowcaseViewModel>.Create(
        tabContentViewInfoList: new[]
        {
            (
                viewGuid: ControlsShowcaseLayout.UxmlGuid,
                labelDataSourcePath: PropertyPath.Combine(
                    PropertyPath.FromName(nameof(ShowcaseViewModel.Controls)),
                    PropertyPath.FromName(nameof(ControlsShowcaseViewModel.TabLabel))
                )
            ),
            (
                viewGuid: ListViewShowcaseLayout.UxmlGuid,
                labelDataSourcePath: PropertyPath.Combine(
                    PropertyPath.FromName(nameof(ShowcaseViewModel.ListView)),
                    PropertyPath.FromName(nameof(ListViewShowcaseViewModel.TabLabel))
                )
            )
        },
        elementNameInfo: ElementNames.RootTab
    );
```

## Parameters

`TabViewProperty<T>.Create()`は次のパラメータを指定することができます。

| パラメータ                  | 型                                                                  | 必須  | 初期値 |
|------------------------|--------------------------------------------------------------------|-----|-----|
| tabContentViewInfoList | `IEnumerable<(string viewGuid, PropertyPath labelDataSourcePath)>` | yes | -   |
| elementNameInfo        | [`ElementNameInfo`](element-name-info)                             | yes | -   |

- **tabContentViewInfoList**  
  `TabViewProperty`は[`Tab`](https://docs.unity3d.com/Manual/UIE-uxml-element-Tab.html)を生成します。  
  `tabContentViewInfoList`では、生成された[`Tab`](https://docs.unity3d.com/Manual/UIE-uxml-element-Tab.html)
  と紐づけるViewクラスの一覧を指定することができます。  
  `TabView`にバインディングされるViewModelは`<T>`で指定した型を持ちます。  
  `tabContentViewInfoList`で指定したViewに異なるViewModelをバインディングしたい場合は、`tabContentViewInfoList`
  で指定するViewクラスに[`HaikaraViewModelProvidableBase`](../view-classes/sub-view-model-providable-view-base.md)を継承させる必要があります。
    - **viewGuid**  
      ViewクラスのGuidを指定します。指定するGuidのViewクラスを含むアセンブリについて、事前に
      [`ViewInstaller.Install()`](../source-generation/view-installer.md#install)
      をしておく必要があります。  
      このGuidを元に`Tab`の中身となる`VisualTreeAsset`を取得、インスタンス化し、Viewクラスによってデータバインディングが実施されます。

    - **labelDataSourcePath**  
      TabView上のラベルのデータソースを指定することができます。

- **elementNameInfo**  
  どのTabViewに対してバインディングを構築するかを指定します。  