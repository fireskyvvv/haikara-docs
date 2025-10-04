---
order: -1
title: What is Haikara?
---

# What is Haikara?
Haikara is an MVVM (Model-View-ViewModel) library for Unity UIToolKit.  
It enables data binding with simple view code.  
The goal is to eliminate the need to specify DataSource in the UI Builder or write complex UI control logic.

## Environment
Unity 6000.0 or later (developed with Unity 6000.0.58f2).  
Haikara uses Unity 6's [runtime data binding](https://docs.unity3d.com/6000.0/Documentation/Manual/UIE-runtime-binding.html) feature.

## Main Features
- **Define binding with code only**  
  You can define data binding for UI ToolKit using only C#.  
  No work is required in the UI Builder.
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

- **Automatic View code generation by Source Generator**  
  Using Roslyn Source Generator, partial classes corresponding to .uxml, mainly the following, are automatically generated:
    - Automatic registration of declared properties (InitializeComponentInternal)
    - Identifier for the corresponding VisualTreeAsset (UxmlGuid)
    - List of element names set in .uxml (ElementNames)
    - List of template information used in .uxml (TemplateInfoList)

Example of generated View code
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

- **Automatic style code generation by Source Generator**  
  The SourceGenerator generates code for listing class declarations used in .uss and for loading StyleSheets as needed.

uss example
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
A Style class corresponding to such a .uss is generated as follows, allowing you to load StyleSheets and use VisualElement.AddToClassList() in a type-safe manner:

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

## License
Haikara is released under the [MIT License](https://github.com/fireskyvvv/Haikara/blob/master/LICENSE.md).