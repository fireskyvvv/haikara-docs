---
order: 0
---

# `HaikaraViewBaseWithViewModel<T>`

最も基本となる`Haikara View`の基底クラスです。  
`T`は`ViewModel`の型を指定します。  
データソースを受け取る際に型チェックが実施され、`T`でない場合はバインディングを行いません。  
型チェックの実施が行われるため、Viewクラス側で安全に`ViewModel`の操作を行うことができます。

次のようにViewクラスを定義することができます。  
```csharp

    [HaikaraUI]
    public partial class FirstSample : HaikaraViewBaseWithViewModel<FirstSampleViewModel>
    {
        private static readonly BindableProperty<Label> LabelProperty =
            BindableProperty<Label>.Create(
                bindingId: PropertyPath.FromName(nameof(Label.text)),
                dataSourcePath: PropertyPath.FromName(nameof(FirstSampleViewModel.Label)),
                elementNameInfo: ElementNames.FirstSampleLabel
            );
    }
    
```