---
title: Template Property
---

# TemplateProperty

`TemplateProperty`は.uxml上に`Template`として追加されている要素とViewクラスを紐づけるためのPropertyです。  
Viewクラスに宣言することで、SourceGeneratorが宣言された`TemplateProperty`を収集します。  
`Template`については[こちら](https://docs.unity3d.com/Manual/UIB-structuring-ui-templates.html)を参照してください。

## 宣言の方法

[`BindableProperty`](bindable-property.md)と同様に`TemplateProperty<T>.Create()`を呼び出すことで宣言ができます。  
`<T>`は指定するViewの型を設定してください。

```csharp
private static readonly TemplateProperty<CounterTemplate> TemplateViewProperty = TemplateProperty<CounterTemplate>.Create(
    TemplateInfoList.ChildVmTemplate
);
```

## Parameters

`TemplateProperty<T>.Create()`は次のパラメータを指定することができます。

| パラメータ        | 型                                                                          | 必須  | 初期値 |
|--------------|----------------------------------------------------------------------------|-----|-----|
| templateInfo | [`TemplateInfo`](../source-generation/view-source-generation.md#TemplateInfo) | yes | -   |

- **templateInfo**  
  .uxml上に宣言された`Template`を指定するためのパラメータです。  
  .uxml上に宣言されている`Template`
  の情報は、SourceGeneratorによって[`TemplateInfoList`](../source-generation/view-source-generation.md#TemplateInfoList)
  として生成されています。
  `templateInfo`で指定したViewには、この`TemplateProperty<T>`
  を宣言したクラスにバインディングされたViewModelが渡されます。  
  ViewModelをバインディングしたい場合は、`<T>`
  で指定するViewクラスに[`HaikaraViewModelProvidableBase`](../view-classes/sub-view-model-providable-view-base.md)を継承させる必要があります。

