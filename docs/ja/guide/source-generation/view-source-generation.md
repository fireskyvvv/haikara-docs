---
order: -1
title: Source Generation (View)
---

# View Source Generation

Haikaraでは[`Roslyn Source Generator`](https://docs.unity3d.com//Manual/roslyn-analyzers.html)を使ってView側のコードを生成します。

## Requirements

Source Generatorは次の条件に当てはまるクラスと、対応する.uxmlを紐づけ、ソースを生成します。

- クラスの所属する`Assembly Definition`が明確に分けられている
- [`HaikaraUI Attribute`](haikara-ui-attribute.md) を持つ
- [`IHaikaraView`](../view-classes/haikara-view.md) を実装する
- .uxmlファイルと同階層、同ファイル名を持つ

Viewのクラスが含まれる.asmdefの`Assembly Definition References`に`Haikara.Runtime.asmdef`を追加する必要があります。

例えば、次のようなファイルの配置を行う必要があります。  
ディレクトリはどのような構造でも問題ありません。

```
Assets
└ Scripts
    └ Sample
        ├ Sample.asmdef
        ├ SampleViewModel.cs
        └ Views
            ├ Layout.uxml
            └ Layout.cs
```

上記のようなファイル構造の場合、次のようなクラスを実装します。

```csharp
    [HaikaraUI]
    public partial class Layout : HaikaraViewBaseWithViewModel<SampleViewModel>
    {
    
    }
```

`HaikaraViewBaseWithViewModel`は[`IHaikaraView`](../view-classes/haikara-view.md)を実装した抽象クラスです。  
コードは、Viewクラスの`partial`クラスとして生成されます。  
上記の例では、次のようなコードとなります。

```
    #nullable enable
    public partial class Layout
    {
        public const string UxmlGuid = "d25cc33d0344b9a47b1860fd32f7c221";
        public override string GetGuid()
        {
            return UxmlGuid;
        }
        
        public override Haikara.Runtime.AssetReferenceMode AssetReferenceMode => Haikara.Runtime.AssetReferenceMode.Resource;
        
        protected override void InitializeComponentInternal()
        {
            ElementProperties.SortElementPropertiesByPriority();
        }
        
        private struct ElementNames
        {
            public const string FirstSampleLabel = "first-sample__label";
        }
        private struct TemplateInfoList
        {
        }
    }
    #nullable restore
```

## UxmlGuid

対応する.uxmlのGuidです。  
[`View Installer`](view-installer.md)や[`UI Catalog`](ui-catalog.md)など、
Viewクラスから対応するUIアセットを決定する際に使われます。

## ElementNames

対応する.uxmlに存在する`Visual Element`に設定されたnameの一覧を生成します。  
[Bindable Property](../bindable-properties/bindable-property.md)の`elementNameInfo`で指定し、
バインディングする`Visual Element`の決定を行うために使用することができます。

## TemplateInfoList

[`Template Property`](../bindable-properties/template-property.md)  
.uxml上に配置された[`Template`](https://docs.unity3d.com/Manual/UIE-WritingUXMLTemplate.html)の情報を次のように生成します。

```csharp
        private struct TemplateInfoList
        {
            public static readonly TemplateInfo SameVmTemplate = new TemplateInfo(
                elementName: "same-vm-template",
                viewGuid: "e6b1e3896e54450dab0f5c3865de2a1b",
                templateId: "CounterSameViewModelTemplate"
            );
            public static readonly TemplateInfo ChildVmTemplate = new TemplateInfo(
                elementName: "child-vm-template",
                viewGuid: "5e392d8c8077f6c4182c12d106691fb2",
                templateId: "CounterSub"
            );
        }
```

### TemplateInfo

- **`elementName`**  
  .uxml上に配置されたTemplateに設定されたnameです。
  こちらもバインディング対象の選択に使われます。
- **`viewGuid`**  
  Templateの実体となるUIアセットのGuidです。
- **`templateId`**  
  .uxml上のTemplateのIdです。  
  Templateとなる.uxmlのファイル名と同値です
