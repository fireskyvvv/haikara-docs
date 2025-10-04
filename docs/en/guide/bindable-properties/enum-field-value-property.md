---
title: EnumFieldValue Property
---

# EnumFieldValueProperty

If the type for EnumField is not specified in UIBuilder (or .uxml), you need to call [`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html).  
`EnumFieldValueProperty`
is a [`BindableProperty`](bindable-property.md) that executes [`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html) during data binding.

## How to Declare

As with [`BindableProperty`](bindable-property.md), you can declare by calling `EnumFieldValueProperty.Create()`.

```csharp
private static readonly EnumFieldValueProperty EnumFieldValueProperty =
    EnumFieldValueProperty.Create(
        defaultValue: ControlShowCaseModel.SampleEnum.Midori,
        dataSourcePath: PropertyPath.FromName(nameof(ControlsShowcaseViewModel.EnumFieldValue)),
        elementNameInfo: ElementNames.EnumField,
        BindingMode.TwoWay
    );
```

## Parameters

In addition to the [parameters provided by BindableProperty](bindable-property.md#parameters), you can specify the following parameters:

| Parameter               | Type  | Required | Default Value |
|-------------------------|-------|----------|--------------|
| defaultValue            | enum  | yes      | -            |
| includeObsoleteValues   | bool  | no       | `false`      |

- **defaultValue**  
  The initial value used in [`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html).
  The type of Enum to be bound is determined from this value.  
  For more details on the internal implementation, see [here](https://github.com/Unity-Technologies/UnityCsReference/blob/4b463aa72c78ec7490b7f03176bd012399881768/Modules/UIElements/Core/Controls/EnumField.cs#L320).

- **includeObsoleteValues**  
  Specifies whether to display enum values marked with `[Obsolete]`.