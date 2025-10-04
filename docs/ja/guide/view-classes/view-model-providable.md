# SubViewModelProvidableViewBase

`SubViewModelProvidableViewBase`は、データソースの設定時に親となるViewにバインディングされたViewModelと異なるViewModelをバインディングすることができるViewクラスです。
次のようにViewクラスを定義することができます。

```csharp

    [HaikaraUI]
    public partial class ControlsShowcaseLayout : 
        SubViewModelProvidableViewBase<ShowcaseViewModel, ControlsShowcaseViewModel>
    {
        protected override ControlsShowcaseViewModel ProvideSubViewModel(ShowcaseViewModel parentViewModel)
        {
            return parentViewModel.Controls;
        }
    }
```

## Use case

`Haikara`では、Viewクラスに設定したViewModelが子へと伝播していきます。  
一方で、.uxmlに紐づけたいViewModelと、その.uxml内のテンプレートとで異なるViewModelを設定したいケースも存在します。  
その場合は、`SubViewModelProvidableViewBase`が非常に有効です。  
このクラスを継承したViewクラスのバインディングが実施される前に、`ProvideSubViewModel()`
が呼び出され、定義した処理からViewModelを指定することができるようになります。  

