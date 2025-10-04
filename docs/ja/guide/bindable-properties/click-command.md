---
title: Click Command
---

# ClickCommand

`[ClickCommand]`は`VisualElement`をクリックした時の挙動を指定することができるAttributeです。  
Viewクラスに宣言することで、SourceGeneratorが宣言された`ClickCommand`
から[`Clickable`](https://docs.unity3d.com/ScriptReference/UIElements.Clickable.html)を生成します。

## 使い方

`[ClickCommand]`は次のように使うことができます。

```csharp
[ClickCommand(ElementNames.Button)]
private void OnClick(EventBase evt)
{
    UnityEngine.Debug.Log("Hello, ClickCommand!");
}
```

## Parameters

`[ClickCommand]`は次のパラメータを指定することができます。

| パラメータ             | 型                                                         | 必須  | 初期値                     |
|-------------------|-----------------------------------------------------------|-----|-------------------------|
| TargetElementName | string                                                    | yes | -                       |
| ElementIndex      | int                                                       | no  | -1                      |
| FindType          | [`ElementFindType`](element-name-info.md#ElementFindType) | no  | `ElementFindType.First` |

- **TargetElementName**  
  どの`VisualElement`に対してバインディングを構築するかを指定します。
- **ElementIndex**  
  同名の`VisualElement`が存在した場合に、どの何番目に見つかった`VisualELement`を対象にするかを指定します。  
  このパラメータは`FindType`が`ElementFindType.Index`以外の場合は無視されます。
- **FindType**  
  `VisualElement`の探索方法を指定します。  
  詳細は[こちら](element-name-info.md#ElementFindType)を参照してください。

## メソッドの引数

`ClickCommand`
を設定するメソッドは引数として[`EventBase`](https://docs.unity3d.com/ScriptReference/UIElements.EventBase.html)
を1つだけ持つ必要があります。  
`EventBase`で対象となる`VisualElement`にインタラクションがあった際のイベントを受け取ることができます。

