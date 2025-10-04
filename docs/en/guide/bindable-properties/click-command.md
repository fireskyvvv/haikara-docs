---
title: Click Command
---

# ClickCommand

`[ClickCommand]` is an Attribute that specifies the behavior when a `VisualElement` is clicked.  
When declared in a View class, the SourceGenerator generates a [`Clickable`](https://docs.unity3d.com/ScriptReference/UIElements.Clickable.html) from the declared `ClickCommand`.

## Usage

You can use `[ClickCommand]` as follows:

```csharp
[ClickCommand(ElementNames.Button)]
private void OnClick(EventBase evt)
{
    UnityEngine.Debug.Log("Hello, ClickCommand!");
}
```

## Parameters

`[ClickCommand]` can specify the following parameters:

| Parameter           | Type                                                         | Required | Default Value             |
|---------------------|--------------------------------------------------------------|----------|--------------------------|
| TargetElementName   | string                                                       | yes      | -                        |
| ElementIndex        | int                                                          | no       | -1                       |
| FindType            | [`ElementFindType`](element-name-info.md#ElementFindType)    | no       | `ElementFindType.First`  |

- **TargetElementName**  
  Specifies which `VisualElement` to construct the binding for.
- **ElementIndex**  
  If there are multiple `VisualElements` with the same name, specifies which one to target by index.  
  This parameter is ignored unless `FindType` is `ElementFindType.Index`.
- **FindType**  
  Specifies how to search for the `VisualElement`.  
  See [here](element-name-info.md#ElementFindType) for details.

## Method Arguments

A method set with
`ClickCommand`
must have a single argument of type [`EventBase`](https://docs.unity3d.com/ScriptReference/UIElements.EventBase.html).
`EventBase` allows you to receive events when there is interaction with the target `VisualElement`.