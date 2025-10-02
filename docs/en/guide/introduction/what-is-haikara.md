---
order: -1
---

# Haikaraとは
Haikaraは、UnityのUIToolKit向けに設計されたMVVM（Model-View-ViewModel）ライブラリです。  
簡単なViewコードを記述することでデータバインディングを実現します。  
UI BuilderでDataSourceを指定したり、複雑なUI制御ロジックを書かなくて済むようになることを目指します。

# 動作環境
Unity 6000.0.50 以上
HaikaraはUnity6の[ランタイムデータバインディング](https://docs.unity3d.com/6000.0/Documentation/Manual/UIE-runtime-binding.html)の機能を利用します。

# 主な機能
- **コードのみでバインディングを定義**  
C#のみでUI ToolKitのデータバインディングを定義できます。  
UI Builder側での作業は不要です。
```csharp
    [HaikaraUI]
    public partial class Counter : HaikaraViewBaseWithViewModel<CounterViewModel>
    {
        private static readonly BindableProperty<Label> CountProperty = BindableProperty<Label>.Create(
            bindingId: "text",
            dataSourcePath: PropertyPath.FromName(nameof(CounterViewModel.Label)),
            elementNameInfo: "counter__value"
        );
    }
```

- **Source GeneratorによるViewコードの自動生成**  
Roslyn Source Generatorを利用し、.uxml に対応するpartialクラスとして主に以下の要素を自動生成します
  - 宣言したプロパティの自動登録 (InitializeComponentInternal)
  - 対応するVisualTreeAssetの識別子 (UxmlGuid)  
  - .uxml上で設定されているエレメント名の一覧 (ElementNames)
  - .uxml上で使用されているTemplateの情報の一覧 (TemplateInfoList)

生成されるViewのコード例
```csharp
    public partial class Counter
    {
        public const string UxmlGuid = "ecbf5f36db5ffd1438c17fd8a05b3d33";
        public override string GetGuid()
        {
            return UxmlGuid;
        }
        public override Haikara.Runtime.Core.AssetReferenceMode AssetReferenceMode => Haikara.Runtime.Core.AssetReferenceMode.Resource;
        
        protected override void InitializeComponentInternal()
        {
            ElementProperties.Add(Haikara.Samples.Counter.Runtime.View.Counter.CountProperty);

            ElementProperties.SortElementPropertiesByPriority();
        }
        
        private struct ElementNames
        {
            public const string CounterValue = "counter__value";
        }

        private struct TemplateInfoList
        {
            public static readonly TemplateInfo ChildVmTemplate = new TemplateInfo(
                elementName: "child-vm-template",
                viewGuid: "5e392d8c8077f6c4182c12d106691fb2",
                templateId: "CounterSub"
            );
        }
    }
```

- **Source GeneratorにStyleコードの自動生成**  
.uss上で使用されているクラス宣言を一覧化したり、任意にStyleSheetを呼び出すためのコードをSourceGeneratorから生成します。

uss例
```css
.unity-label {
    color: red;
}

.unity-button,
.unity-toggle__checkmark {
    background-color: gray;
}

#test-view__toggle {
    color: blue;
}

#test-view__text-field .unity-base-text-field__input {
    color: blue;
}

.unity-label {
    font-size: 15;
}
```
このような.ussに対応するStyleクラスを作成すると次のようなコードが生成され、StyleSheetのロードや、VisualElement.AddToClassList() を型安全に実施することができます。  

```csharp
    public partial class TestStyle
    {
        public const string UssGuid = "902223a66070df74682291f5a6459f06";
        public override string GetGuid()
        {
            return UssGuid;
        }
        
        public static async Task<StyleSheet?> GetStyleSheet()
        {
            return await RuntimeUICatalog.Instance.LoadStyleSheetAsync(UssGuid);
        }
        
        public override Haikara.Runtime.Core.AssetReferenceMode AssetReferenceMode => Haikara.Runtime.Core.AssetReferenceMode.Resource;
        
        public class UsedClassNames
        {

            public const string UnityLabel = ".unity-label";
            
            public const string UnityButton = ".unity-button";
            
            public const string UnityToggleCheckmark = ".unity-toggle__checkmark";
            
            public const string UnityBaseTextFieldInput = ".unity-base-text-field__input";
            
        }
            
    }
```

# ライセンス
Haikaraは [MIT License]()で公開しています。