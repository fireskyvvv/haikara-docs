---
order: -1
title: Bindable Property
---

# BindableProperty

`BindableProperty`は.uxml上の要素とViewModelのデータバインディングを指定するためのクラスです。  
Viewクラスに宣言することで、SourceGeneratorが初期化時に宣言された`BindableProperty`を収集します。  
宣言された`BindableProperty`
がVisualElementに対して[
`VisualElement.SetBinding()`](https://docs.unity3d.com/Documentation/ScriptReference/UIElements.VisualElement.SetBinding.html)
を実行します。

## 宣言の方法

`BindableProperty`を作成するには `BindableProperty<T>.Create()`を呼び出します。

```csharp
private static readonly BindableProperty<Label> LabelTextProperty =
    BindableProperty<Label>.Create(
        bindingId: PropertyPath.FromName(nameof(Label.text)),
        dataSourcePath: PropertyPath.FromName(nameof(ControlsShowcaseViewModel.Label)),
        elementNameInfo: ElementNames.Label,
        bindingMode: BindingMode.ToTarget,
        updateTrigger: BindingUpdateTrigger.OnSourceChanged
    );
```

## Parameters

柔軟にデータバインディングを指定できるように、`BindableProperty<T>.Create()`は次のパラメータを指定することができます。

| パラメータ           | 型                                                                                                       | 必須  | 初期値                                    |
|-----------------|---------------------------------------------------------------------------------------------------------|-----|----------------------------------------|
| bindingId       | [`BindingId`](https://docs.unity3d.com/ScriptReference/UIElements.BindingId.html)                       | yes | -                                      |
| dataSourcePath  | [`PropertyPath`](https://docs.unity3d.com/ScriptReference/Unity.Properties.PropertyPath.html)           | yes | -                                      |
| elementNameInfo | [`ElementNameInfo`](element-name-info)                                                                  | yes | -                                      |
| bindingMode     | [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html)                   | no  | `BindingMode.ToTarget`                 |
| updateTrigger   | [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html) | no  | `BindingUpdateTrigger.OnSourceChanged` |

- **bindingId**  
  バインディングするVisualElementの、どのプロパティに対してバインディングするかを指定します。  
  上記の例では`UnityEngine.UIElements.Label.text`を指定しています。

- **dataSourcePath**
  ViewModelに宣言されたどのプロパティをバインディングするかを指定します。  
  上記の例では`ControlsShowcaseViewModel.Label`を指定しています。

- **elementNameInfo**
  どのVisualElementに対してバインディングを構築するかを指定します。  
  ここにはVisualElementの名前を文字列で指定することもできます。  
  文字列を安全に指定できるようにするためにSourceGeneratorによって`ElementNames`
  という構造体が作成され、VisualElementの名前が宣言されています。  
  詳細は、[View source generation](../source-generation/view-source-generation.md)を確認してください。

- **bindingMode**  
  [`BindingMode`](https://docs.unity3d.com/ScriptReference/UIElements.BindingMode.html) を指定します。  
  対象にしたいVisualElementの種類によって、適切に設定してください。  
  例えば、Toggleなどユーザー操作を受ける要素については`BindingMode.TwoWay`
  を設定することでユーザー操作とViewModelの操作の両方からの変更を反映することができます。

- **updateTrigger**  
  [`BindingUpdateTrigger`](https://docs.unity3d.com/ScriptReference/UIElements.BindingUpdateTrigger.html) を指定します。

## 紐づけ

Viewクラスは宣言された`BindableProperty`を収集し、次のような紐づけを行います。

```csharp

        public override void FindElementAndSetBinding(VisualElement elementRoot)
        {
            Elements = ElementNameInfo.Find<T>(elementRoot);
            foreach (var element in Elements)
            {
                element?.SetBinding(
                    bindingId: BindingId,
                    binding: new DataBinding()
                    {
                        bindingMode = BindingMode,
                        dataSourcePath = DataSourcePath,
                        updateTrigger = UpdateTrigger,
                    }
                );
            }
        }
        
```