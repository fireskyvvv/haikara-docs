---
title: EnumFieldValue Property
---

# EnumFieldValueProperty

UIBuilder(または.uxml)
でEnumFieldの方が指定されていない場合、[`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html)
を呼び出す必要があります。  
`EnumFieldValueProperty`
はデータバインディング時に[`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html)
を実行する[`BindableProperty`](bindable-property.md)です。

## 宣言の方法

[`BindableProperty`](bindable-property.md)と同様に`EnumFieldValueProperty.Create()`を呼び出すことで宣言ができます。

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

[BindablePropertyが持つパラメータ](bindable-property.md#parameters)の他に、次のパラメータを指定することができます。

| パラメータ                 | 型    | 必須  | 初期値     |
|-----------------------|------|-----|---------|
| defaultValue          | enum | yes | -       |
| includeObsoleteValues | bool | no  | `false` |

- **defaultValue**  
  [`EnumField.Init()`](https://docs.unity3d.com/ScriptReference/UIElements.EnumField.Init.html)にで使われる初期値です。
  この値を元に、バインディングされるEnumの種類が決定されます。  
  詳細な内部実装は[こちら](https://github.com/Unity-Technologies/UnityCsReference/blob/4b463aa72c78ec7490b7f03176bd012399881768/Modules/UIElements/Core/Controls/EnumField.cs#L320)
  を参照してください。

- **includeObsoleteValues**  
  `[Obsolete]`が付いたenumの値を表示するかどうかを指定します。