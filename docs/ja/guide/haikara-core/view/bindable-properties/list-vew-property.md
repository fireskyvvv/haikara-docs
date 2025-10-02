---
title: ListView Property
---

# ListViewProperty

[`ListView`](https://docs.unity3d.com/Manual/UIE-uxml-element-ListView.html)
のバインディングを宣言するときに利用する[`BindableProperty`](bindable-property.md)です。

## 宣言の方法

[`BindableProperty`](bindable-property.md)と同様に`ListViewProperty<T>.Create()`を呼び出すことで宣言ができます。

```csharp
private static readonly ListViewProperty<AlarmInfoViewModel> ListDataSourceProperty =
    ListViewProperty<AlarmInfoViewModel>.Create(
        itemViewId: AlarmInfoLayout.UxmlGuid,
        makeItemSource: MakeItem,
        itemsSourcePath: PropertyPath.FromName(nameof(AlarmInfoListViewModel.Current)),
        elementNameInfo: ElementNames.AlarmsList
    );

private static AlarmInfoViewModel MakeItem(int index)
{
    var newInfo = new AlarmInfo
    {
        isEnabled = true,
        id = Guid.NewGuid().ToString(),
        info = $"Alarm {index + 1}",
        timeStringIso8601 = DateTime.Now.ToString("yyyy-MM-dd'T'HH:mm:sszzz"),
    };
    return new AlarmInfoViewModel(newInfo);
}
```

## Parameters

`TabViewProperty<T>.Create()`は次のパラメータを指定することができます。

| パラメータ           | 型                                                                                                       | 必須  | 初期値                                    |
|-----------------|---------------------------------------------------------------------------------------------------------|-----|----------------------------------------|
| itemViewId      | `string`                                                                                                | yes | -                                      |
| makeItemSource  | `MakeItemSourceDelegate`                                                                                | yes | -                                      |
| itemsSourcePath | [`PropertyPath`](https://docs.unity3d.com/ScriptReference/Unity.Properties.PropertyPath.html)           | yes | -                                      |
| elementNameInfo | [`ElementNameInfo`](../view-source-generation.md#ElementNameInfo)                                       | yes | -                                      |
| bindingMode     | [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html)                   | no  | `BindingMode.ToTarget`                 |
| updateTrigger   | [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html) | no  | `BindingUpdateTrigger.OnSourceChanged` |

- **itemViewId**  
  ViewクラスのGuidを指定します。指定するGuidのViewクラスを含むアセンブリについて、事前に
  [`ViewInstaller.Install()`](../view-installer.md#install)
  をしておく必要があります。
  `ListView.makeItem`でこのGuidを元に`VisualTreeAsset`を取得、インスタンス化し、Viewクラスによってデータバインディングが実行されます。

- **makeItemSource**
  [`ListView.bindItem`](https://docs.unity3d.com/ScriptReference/UIElements.ListView-bindItem.html)
  が発火する際に、どのように
  [`itemsSource`](https://docs.unity3d.com/ScriptReference/UIElements.BaseVerticalCollectionView-itemsSource.html)
  の中身を作成するかを定義することができます。  
  `makeItemSource`で指定した処理の結果が`ListView`内の要素1つ当たりのデータソースとなります。

- **elementNameInfo**
  どの`ListView`に対してバインディングを構築するかを指定します。

- **bindingMode**  
  [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html) を指定します。

- **updateTrigger**  
  [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html) を指定します。