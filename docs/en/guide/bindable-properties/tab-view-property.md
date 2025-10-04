---
title: TabView Property
---

# TabViewProperty

This is a [`BindableProperty`](bindable-property.md) used when declaring bindings for [`TabView`](https://docs.unity3d.com/Manual/UIE-uxml-element-TabView.html).

## How to Declare

As with [`BindableProperty`](bindable-property.md), you can declare by calling `TabViewProperty<T>.Create()`.  
`<T>` specifies the type of ViewModel you want to bind to the `TabView`.

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

`TabViewProperty<T>.Create()` can specify the following parameters:

| Parameter                  | Type                                                                  | Required | Default Value |
|----------------------------|-----------------------------------------------------------------------|----------|--------------|
| tabContentViewInfoList     | `IEnumerable<(string viewGuid, PropertyPath labelDataSourcePath)>`    | yes      | -            |
| elementNameInfo            | [`ElementNameInfo`](element-name-info)                                | yes      | -            |

- **tabContentViewInfoList**  
  `TabViewProperty` generates [`Tab`](https://docs.unity3d.com/Manual/UIE-uxml-element-Tab.html)s.  
  In `tabContentViewInfoList`, you can specify a list of View classes to be associated with the generated [`Tab`](https://docs.unity3d.com/Manual/UIE-uxml-element-Tab.html).  
  The ViewModel bound to the `TabView` has the type specified by `<T>`.  
  If you want to bind a different ViewModel to the View specified in `tabContentViewInfoList`, the View class specified must inherit from [`HaikaraViewModelProvidableBase`](../view-classes/sub-view-model-providable-view-base.md).
    - **viewGuid**  
      Specifies the Guid of the View class. For the assembly containing the View class with the specified Guid, you need to call [`ViewInstaller.Install()`](../source-generation/view-installer.md#install) in advance.  
      Using this Guid, the `VisualTreeAsset` that becomes the content of each `Tab` is obtained and instantiated, and data binding is performed by the View class.

    - **labelDataSourcePath**  
      Specifies the data source for the label on the TabView.

- **elementNameInfo**  
  Specifies which TabView to construct the binding for.