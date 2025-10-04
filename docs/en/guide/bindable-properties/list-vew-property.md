---
title: ListView Property
---

# ListViewProperty

This is a [`BindableProperty`](bindable-property.md) used when declaring bindings for [`ListView`](https://docs.unity3d.com/Manual/UIE-uxml-element-ListView.html).

## How to Declare

As with [`BindableProperty`](bindable-property.md), you can declare by calling `ListViewProperty<T>.Create()`.

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

`TabViewProperty<T>.Create()` can specify the following parameters:

| Parameter         | Type                                                                                                       | Required | Default Value                             |
|-------------------|-----------------------------------------------------------------------------------------------------------|----------|-------------------------------------------|
| itemViewId        | `string`                                                                                                  | yes      | -                                         |
| makeItemSource    | `MakeItemSourceDelegate`                                                                                  | yes      | -                                         |
| itemsSourcePath   | [`PropertyPath`](https://docs.unity3d.com/ScriptReference/Unity.Properties.PropertyPath.html)             | yes      | -                                         |
| elementNameInfo   | [`ElementNameInfo`](../source-generation/view-source-generation.md#ElementNameInfo)                       | yes      | -                                         |
| bindingMode       | [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html)                     | no       | `BindingMode.ToTarget`                    |
| updateTrigger     | [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html)   | no       | `BindingUpdateTrigger.OnSourceChanged`    |

- **itemViewId**  
  Specifies the Guid of the View class. For the assembly containing the View class with the specified Guid, you need to call [`ViewInstaller.Install()`](../source-generation/view-installer.md#install) in advance.
  In `ListView.makeItem`, this Guid is used to obtain and instantiate a `VisualTreeAsset`, and data binding is executed by the View class.

- **makeItemSource**  
  Defines how to create the contents of [`itemsSource`](https://docs.unity3d.com/ScriptReference/UIElements.BaseVerticalCollectionView-itemsSource.html) when [`ListView.bindItem`](https://docs.unity3d.com/ScriptReference/UIElements.ListView-bindItem.html) is triggered.  
  The result of the process specified by `makeItemSource` becomes the data source for each item in the `ListView`.

- **elementNameInfo**  
  Specifies which `ListView` to construct the binding for.

- **bindingMode**  
  Specifies [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html).

- **updateTrigger**  
  Specifies [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html).